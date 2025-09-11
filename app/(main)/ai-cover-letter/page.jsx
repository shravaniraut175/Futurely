import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 md:px-12 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button
            className="flex items-center gap-2 px-5 py-2 rounded-xl shadow-lg 
                       bg-gradient-to-r from-blue-600 to-purple-600 
                       hover:from-purple-600 hover:to-pink-600 
                       text-white font-semibold transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Create New
          </Button>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

      {/* Cover Letter List */}
      <div className="rounded-2xl bg-gray-900/60 p-6 shadow-xl backdrop-blur-md border border-gray-800">
        <CoverLetterList coverLetters={coverLetters} />
      </div>
    </div>
  );
}