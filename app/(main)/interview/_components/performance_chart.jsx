"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (assessments) {
            const formattedData = assessments.map((assessment) => ({
                date: format(new Date(assessment.createdAt), "MMM dd"),
                score: assessment.quizScore,
            }));
            setChartData(formattedData);
        }
    }, [assessments]);

    return (
        <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Performance Trend
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Your quiz scores over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fill: "#ccc" }} />
                            <YAxis domain={[0, 100]} tick={{ fill: "#ccc" }} />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload?.length) {
                                        return (
                                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 shadow-lg">
                                                <p className="text-sm font-medium text-white">
                                                    Score: {payload[0].value}%
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {payload[0].payload.date}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#FACC15"       // bright yellow for dark background
                                strokeWidth={3}        // slightly thicker
                                dot={{ stroke: "#fff", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}