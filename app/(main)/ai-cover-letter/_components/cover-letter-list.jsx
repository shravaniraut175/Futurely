"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card className="bg-gray-900/60 border border-gray-800 text-gray-300 shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            No Cover Letters Yet
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {coverLetters.map((letter) => (
        <Card
          key={letter.id}
          className="group relative bg-gray-900/60 border border-gray-800 
                     shadow-md hover:shadow-2xl backdrop-blur-md 
                     transition-all duration-300 rounded-xl overflow-hidden"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Title + Date */}
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {letter.jobTitle}{" "}
                  <span className="text-gray-400 font-light">at</span>{" "}
                  {letter.companyName}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm mt-1">
                  Created {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-blue-600/20 hover:text-blue-400"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                >
                  <Eye className="h-5 w-5" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-red-600/20 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border border-gray-700 text-gray-200">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-400">
                        Delete Cover Letter?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. It will permanently delete
                        your cover letter for{" "}
                        <span className="font-semibold text-white">
                          {letter.jobTitle}
                        </span>{" "}
                        at{" "}
                        <span className="font-semibold text-white">
                          {letter.companyName}
                        </span>
                        .
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>

          {/* Preview */}
          <CardContent>
            <div className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {letter.jobDescription}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}