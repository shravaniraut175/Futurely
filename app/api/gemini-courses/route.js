"use server";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const skill = searchParams.get("skill") || "programming";

    const prompt = `
      List 5 recent online courses for "${skill}".
      Only return JSON with "title" and "platform" (Coursera, Udemy, edX, LinkedIn Learning).
      Example:
      {
        "results": [
          { "title": "Course Name", "platform": "Udemy" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    const data = JSON.parse(text);

    // Map to working provider links
    const platformLinks = {
      "Coursera": "https://www.coursera.org/search?query=",
      "Udemy": "https://www.udemy.com/courses/search/?q=",
      "edX": "https://www.edx.org/search?q=",
      "LinkedIn Learning": "https://www.linkedin.com/learning/search?keywords=",
    };

    const courses = data.results.map(course => {
      const base = platformLinks[course.platform] || "https://www.google.com/search?q=";
      return {
        title: course.title,
        platform: course.platform,
        link: `${base}${encodeURIComponent(course.title)}`
      };
    });

    return NextResponse.json({ results: courses });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
