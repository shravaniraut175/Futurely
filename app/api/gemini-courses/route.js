"use server";

import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getImageUrl(keyword: string) {
  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(
      keyword
    )}&image_type=photo&per_page=3`
  );

  if (!res.ok) return "https://via.placeholder.com/150";
  const data = await res.json();

  if (data.hits && data.hits.length > 0) {
    return data.hits[0].webformatURL;
  }

  return "https://via.placeholder.com/150";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { skill } = req.query;
  if (!skill || typeof skill !== "string") {
    res.status(400).json({ error: "Missing or invalid skill parameter" });
    return;
  }

  const prompt = `
  I am a job seeker missing the skill "${skill}".
  Recommend 3 high-quality online courses (title, platform, URL).
  Also provide a short description or keyword for an image representing the course or skill.
  Return JSON in this format:
  [
    {
      "title": "...",
      "platform": "...",
      "url": "...",
      "image_keyword": "..."
    }
  ]
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message?.content ?? "[]";

    let courses = [];
    try {
      courses = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Failed to parse OpenAI response" });
    }

    // Attach Pixabay images
    const coursesWithImages = await Promise.all(
      courses.map(async (course: any) => {
        const image_url = await getImageUrl(course.image_keyword);
        return { ...course, image_url };
      })
    );

    res.status(200).json(coursesWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}












// // import OpenAI from "openai";

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // export async function GET(req) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const skill = searchParams.get("skill") || "programming";

// //     const prompt = `
// //       Find top 5 online courses to learn "${skill}".
// //       Return results in JSON format ONLY:
// //       {
// //         "results": [
// //           { "title": "string", "link": "string", "platform": "string" }
// //         ]
// //       }
// //     `;

// //     // Generate response from OpenAI
// //     const completion = await openai.chat.completions.create({
// //       model: "gpt-4o-mini", // or "gpt-4", "gpt-3.5-turbo"
// //       messages: [{ role: "user", content: prompt }],
// //     });

// //     // Extract text
// //     const text = completion.choices[0].message.content.replace(/```/g, "").trim();

// //     // Parse JSON
// //     let json = { results: [] };
// //     try {
// //       const match = text.match(/\{[\s\S]*\}/); // extract first {...}
// //       if (match) json = JSON.parse(match[0]);
// //     } catch (err) {
// //       console.error("Failed to parse OpenAI response:", err);
// //       json = { results: [] };
// //     }

// //     return new Response(JSON.stringify(json), {
// //       status: 200,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   } catch (err) {
// //     console.error("OpenAI API error:", err);
// //     return new Response(JSON.stringify({ results: [] }), {
// //       status: 200,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   }
// // }
// // Remove this line, as 'import type' is only valid in TypeScript files
// import type { NextApiRequest, NextApiResponse } from "next";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function getImageUrl(keyword: string) {
//   const res = await fetch(
//     `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
//       keyword
//     )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
//   );
//   if (!res.ok) return "https://via.placeholder.com/150";
//   const data = await res.json();
//   return data.urls?.small || "https://via.placeholder.com/150";
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { skill } = req.query;
//   if (!skill || typeof skill !== "string") {
//     res.status(400).json({ error: "Missing or invalid skill parameter" });
//     return;
//   }

//   const prompt = `
//   I am a job seeker missing the skill "${skill}".
//   Recommend 3 high-quality online courses (title, platform, URL).
//   Also provide a short description or keyword for an image representing the course or skill.
//   Return JSON in this format:
//   [
//     {
//       "title": "...",
//       "platform": "...",
//       "url": "...",
//       "image_keyword": "..."
//     }
//   ]
//   `;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });

//     const text = completion.choices[0].message?.content ?? "[]";

//     let courses = [];
//     try {
//       courses = JSON.parse(text);
//     } catch {
//       return res.status(500).json({ error: "Failed to parse OpenAI response" });
//     }

//     // Fetch images for each course
//     const coursesWithImages = await Promise.all(
//       courses.map(async (course: any) => {
//         const image_url = await getImageUrl(course.image_keyword);
//         return { ...course, image_url };
//       })
//     );

//     res.status(200).json(coursesWithImages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
