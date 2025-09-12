import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats_cards";
import PerformanceChart from "./_components/performance_chart";
import QuizList from "./_components/quiz_list";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 md:px-12 py-10">
      {/* Header Section */}
      <div className="pt-15 pl-2 flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
        Interview Preparation
        </h1>
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}