import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 md:px-12 py-10">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 mb-8">
        <Link href="/ai-cover-letter">
          <Button
            variant="ghost"
            className="w-fit gap-2 pl-0 pr-4 py-2 rounded-xl 
                       text-gray-300 hover:text-white 
                       hover:bg-gray-800/50 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md leading-snug">
          {coverLetter?.jobTitle}{" "}
          <span className="text-gray-400 font-light">at</span>{" "}
          {coverLetter?.companyName}
        </h1>
      </div>

      {/* Cover Letter Preview */}
      <div className="rounded-2xl bg-gray-900/60 p-6 shadow-xl backdrop-blur-md border border-gray-800 transition-all duration-300 hover:shadow-2xl">
        <CoverLetterPreview content={coverLetter?.content} />
      </div>
    </div>
  );
}