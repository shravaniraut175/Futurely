"use client";

import { format, formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  BarChartIcon,
  ActivityIcon,
  ZapIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardView = ({ insights }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-emerald-500";
      case "medium":
        return "bg-amber-400";
      case "low":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  const handleSkillClick = async (skill) => {
    setSelectedSkill(skill);
    setLoading(true);

    try {
      const res = await fetch(`/api/gemini-courses?skill=${skill}`);
      const data = await res.json();
      setCourses(data.results || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Last Updated Badge */}
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="text-sm px-3 py-1">
          Updated on: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Market Forecast
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-muted-foreground">
              Upcoming update in {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Sector Growth
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Demand Status
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {insights.demandLevel}
            </div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Skill Highlights
            </CardTitle>
            <ZapIcon className="h-4 w-4 text-orange-700" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Industry Highlights
            </CardTitle>
            <CardDescription>
              Notable trends currently shaping the sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Skills with Click Feature */}
        <Card>
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Recommended Skills
            </CardTitle>
            <CardDescription>
              Click a skill to explore recent courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  onClick={() => handleSkillClick(skill)}
                  className="cursor-pointer px-4 py-2 text-base font-semibold rounded-lg border-2 border-blue-400 bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 hover:from-blue-500/20 hover:to-purple-600/20 transition"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Courses List */}
            {selectedSkill && (
              <div className="mt-4 p-3 border rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-2 text-lg text-blue-600">
                  Courses for {selectedSkill}
                </h3>
                {loading ? (
                  <p className="text-sm text-gray-500">Fetching courses...</p>
                ) : courses.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {courses.map((course, i) => (
                      <li key={i}>
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {course.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No courses found.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;


{/* Salary Overview */}
{/* <Card className="col-span-4">
  <CardHeader>
    <CardTitle className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
      Role-Based Salary Overview
    </CardTitle>
    <CardDescription>
      Showing minimum, median, and maximum salary figures (in $K) for each
      role
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background border rounded-lg p-2 shadow-md">
                    <p className="font-medium">{label}</p>
                    {payload.map((item) => (
                      <p key={item.name} className="text-sm">
                        {item.name}: ${item.value}K
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
          <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
          <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card> */}