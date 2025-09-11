"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export const generateAIInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
            "recommendedSkills": [
              "⭐ SKILL1",
              "⭐ SKILL2",
              "⭐ SKILL3",
              "⭐ SKILL4",
              "⭐ SKILL5",
              "⭐ SKILL6",
              "⭐ SKILL7",
              "⭐ SKILL8"
            ],
            "learningResources": [
              {
                "skill": "SKILL_NAME",
                "courses": [
                  { "title": "Course Title", "provider": "Platform Name", "url": "https://example.com" }
                ]
              }
            ]
          }
          
          IMPORTANT:
          - Return ONLY the JSON. No additional text, notes, or markdown formatting.
          - Ensure "recommendedSkills" contains AT LEAST 8 strong, future-proof skills with emphasis (⭐ prefix and UPPERCASE).
          - For each recommended skill, add at least 2-3 good online courses (Coursera, Udemy, edX, YouTube, etc.) inside "learningResources".
          - Use real-looking links (working URLs from known platforms).
        `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}
