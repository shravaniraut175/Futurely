"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2, Save, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import { useState } from "react";

export default function ResumeBuilder({ initialContent }) {
  const { user } = useUser();

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: { email: "", mobile: "", linkedin: "", github: "" },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const { loading: isSaving, fn: saveResumeFn } = useFetch(saveResume);

  const formValues = watch();
  const [activeTab, setActiveTab] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      await html2pdf().set({
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).from(element).save();
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(JSON.stringify(formValues));
      toast.success("Resume saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume");
    }
  };

  return (
   <div
      data-color-mode="dark"
      className="space-y-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-6 rounded-lg shadow-lg text-gray-100"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
          Resume Builder
        </h1>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-1" />}
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Download className="h-4 w-4 mr-1" />}
            {isGenerating ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Form */}
        <TabsContent value="edit">
          <form className="space-y-8">
            {/* Contact Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["email", "mobile", "linkedin", "github"].map(field => (
                  <div key={field} className="space-y-1">
                    <label className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <Input {...register(`contactInfo.${field}`)} placeholder={`Enter ${field}`} />
                    {errors.contactInfo?.[field] && (
                      <p className="text-red-500 text-sm">{errors.contactInfo[field].message}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Professional Summary</h2>
              <Controller name="summary" control={control} render={({ field }) => (
                <Textarea {...field} className="h-32" placeholder="Write a compelling summary..." />
              )} />
              {errors.summary && <p className="text-red-500 text-sm">{errors.summary.message}</p>}
            </section>

            {/* Skills */}
            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Controller name="skills" control={control} render={({ field }) => (
                <Textarea {...field} className="h-32" placeholder="List your key skills..." />
              )} />
              {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
            </section>

            {/* Experience / Education / Projects */}
            {["experience", "education", "projects"].map(section => (
              <section key={section} className="space-y-2">
                <h2 className="text-xl font-semibold">{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
                <Controller name={section} control={control} render={({ field }) => (
                  <EntryForm type={section} entries={field.value} onChange={field.onChange} />
                )} />
              </section>
            ))}
          </form>
        </TabsContent>

        {/* Preview */}
        <TabsContent value="preview">
          <div id="resume-pdf" className="max-w-3xl mx-auto p-6 border rounded-lg bg-white text-black space-y-4">
            <header className="text-center">
              <h1 className="text-3xl font-bold text-black">{user?.fullName || "Your Name"}</h1>
              <p className="text-sm text-gray-700 space-x-2">
                {formValues?.contactInfo?.email && (
                  <span>Email: <a href={`mailto:${formValues.contactInfo.email}`} className="text-blue-600">{formValues.contactInfo.email}</a></span>
                )}
                {formValues?.contactInfo?.mobile && (
                  <span> | Mobile: <a href={`tel:${formValues.contactInfo.mobile}`} className="text-blue-600">{formValues.contactInfo.mobile}</a></span>
                )}
                {formValues?.contactInfo?.linkedin && (
                  <span> | LinkedIn: <a href={formValues.contactInfo.linkedin} target="_blank" className="text-blue-600">{formValues.contactInfo.linkedin}</a></span>
                )}
                {formValues?.contactInfo?.github && (
                  <span> | GitHub: <a href={formValues.contactInfo.github} target="_blank" className="text-blue-600">{formValues.contactInfo.github}</a></span>
                )}
              </p>
            </header>

            {/* Summary */}
            {formValues?.summary && (
              <section>
                <h2 className="text-xl font-semibold text-black border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                <p className="text-gray-800">{formValues.summary}</p>
              </section>
            )}

            {/* Skills */}
            {formValues?.skills && (
              <section>
                <h2 className="text-xl font-semibold text-black border-b border-gray-300 pb-1 mb-2">Skills</h2>
                <ul className="list-disc list-inside text-gray-800">
                  {formValues.skills.split(",").map((skill, idx) => (
                    <li key={idx}>{skill.trim()}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Experience / Education / Projects */}
            {/* {["experience", "education", "projects"].map(section =>
              formValues?.[section]?.length > 0 && (
                <section key={section}>
                  <h2 className="text-xl font-semibold text-black border-b border-gray-300 pb-1 mb-2">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    {formValues[section].map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <div>
                          <strong>{item.title || JSON.stringify(item)}</strong>
                          {item.company && ` at ${item.company}`}
                          {item.details && <p className="ml-2">{item.details}</p>} 
                        </div>
                        {item.duration && (
                          <span className="text-gray-600 text-sm">{item.duration}</span> 
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )
            )} */}
            {/* Experience / Education / Projects */}
{["experience", "education", "projects"].map(section =>
  formValues?.[section]?.length > 0 && (
    <section key={section}>
      <h2 className="text-xl font-semibold text-black border-b border-gray-300 pb-1 mb-2">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        {formValues[section].map((item, idx) => (
          <li key={idx} className="flex flex-col md:flex-row justify-between">
            <div>
              <strong>{item.title || "Untitled"}</strong>
              {item.company && ` at ${item.company}`}
              {item.details && (
                <p className="ml-2 mt-1">{item.details}</p> // Paragraphs/description
              )}
            </div>
            {item.startDate || item.endDate ? (
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                {item.startDate ? item.startDate : ""} {item.startDate && item.endDate ? " - " : ""} {item.endDate ? item.endDate : ""}
              </span>
            ) : null} {/* Dates */}
          </li>
        ))}
      </ul>
    </section>
  )
)}

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
