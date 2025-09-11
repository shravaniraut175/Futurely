"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const skill = searchParams.get("skill") || "programming";

    const prompt = `
      Find top 5 online courses to learn "${skill}".
      Return results in JSON format ONLY:
      {
        "results": [
          { "title": "string", "link": "string", "platform": "string" }
        ]
      }
    `;

    // Generate response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4", "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
    });

    // Extract text
    const text = completion.choices[0].message.content.replace(/```/g, "").trim();

    // Parse JSON
    let json = { results: [] };
    try {
      const match = text.match(/\{[\s\S]*\}/); // extract first {...}
      if (match) json = JSON.parse(match[0]);
    } catch (err) {
      console.error("Failed to parse OpenAI response:", err);
      json = { results: [] };
    }

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
