"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  useEffect(() => {
  if (generatedLetter) {
    toast.success("Cover letter generated successfully!");
    // small delay to let DB commit
    setTimeout(() => {
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
    }, 300);
    reset();
  }
}, [generatedLetter]);


  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/60 border border-gray-800 text-gray-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Job Details
          </CardTitle>
          <CardDescription className="text-gray-400">
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Company + Job Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-gray-300 font-medium"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-300 font-medium">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label
                htmlFor="jobDescription"
                className="text-gray-300 font-medium"
              >
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-40 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={generating}
                className="px-6 py-2 rounded-lg font-semibold text-white 
                           bg-gradient-to-r from-blue-600 to-purple-600 
                           hover:from-purple-600 hover:to-pink-600 
                           transition-all duration-300 shadow-lg"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}