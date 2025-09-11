"use client";

import React, { useState } from "react";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import SkillCourses from "./SkillCourses";

const DashboardView = ({ insights }) => {
  const [openSkill, setOpenSkill] = useState(null);

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-blue-400";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const marketInfo = (() => {
    switch (insights.marketOutlook.toLowerCase()) {
      case "positive":
        return { Icon: TrendingUp, color: "text-green-400" };
      case "neutral":
        return { Icon: LineChart, color: "text-blue-400" };
      case "negative":
        return { Icon: TrendingDown, color: "text-red-400" };
      default:
        return { Icon: LineChart, color: "text-gray-400" };
    }
  })();

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), {
    addSuffix: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 md:px-12 py-8 space-y-6">
      {/* Last Updated */}
      <div className="flex justify-end">
        <Badge className="text-gray-200 border-gray-600" variant="outline">
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Market Outlook */}
        <Card className="bg-gray-800/70 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-700">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Market Outlook
            </CardTitle>
            <marketInfo.Icon className={`h-5 w-5 ${marketInfo.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-gray-400">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth */}
        <Card className="bg-gray-800/70 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-700">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        {/* Demand Level */}
        <Card className="bg-gray-800/70 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-700">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Demand Level
            </CardTitle>
            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card className="bg-gray-800/70 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-700">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Top Skills
            </CardTitle>
            <Brain className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-auto pr-2">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Roadmap & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Roadmap */}
        <Card className="bg-gray-800/70 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-200">Career Roadmap</CardTitle>
            <CardDescription className="text-gray-400">
              Recommended skills and learning resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">
                ⭐ Recommended Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {insights.recommendedSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex flex-col items-start gap-2 p-3 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-blue-400 transition-colors"
                  >
                    <Badge
                      variant="outline"
                      className="text-blue-300 border-blue-500 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500"
                      onClick={() =>
                        setOpenSkill(openSkill === skill ? null : skill)
                      }
                    >
                      {openSkill === skill ? "Hide Courses" : "View Courses"}
                    </Button>
                    {openSkill === skill && (
                      <div className="w-full mt-2">
                        <SkillCourses skill={skill} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Highlights */}
        <Card className="bg-gray-800/70 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 rounded-xl border border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-200">
              Industry Highlights
            </CardTitle>
            <CardDescription className="text-gray-400">
              Notable trends currently shaping the sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-400" />
                  <span className="text-gray-200">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
