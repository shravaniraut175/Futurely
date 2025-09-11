import { UserPlus, FileEdit, CheckCircle2, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Smart Onboarding",
    description:
      "Provide your work experience, skills, and target roles so the AI understands your profile.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "AI Resume Generation",
    description:
      "Generate optimized resumes tailored to specific roles, highlighting your strengths and relevant achievements.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Skill Gap Recommendations",
    description:
      "Get insights on missing skills and actionable suggestions to make your resume stronger and future-ready.",
    icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Impact & Progress",
    description:
      "Monitor improvements and measurable productivity gains from optimized resumes and targeted applications.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
