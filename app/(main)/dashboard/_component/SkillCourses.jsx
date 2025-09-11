"use client";

import { useState } from "react";

export default function SkillCourses({ skill }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gemini-courses?skill=${encodeURIComponent(skill)}`);
      const data = await res.json();
      setCourses(data.results || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">📚 Learn {skill}</h3>

      {courses.length === 0 ? (
        <button
          onClick={fetchCourses}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : `🔍 Find ${skill} Courses`}
        </button>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {courses.map((course, i) => (
            <li key={i}>
              <a
                href={course.link}
                target="_blank"
                className="text-blue-600 underline font-medium"
              >
                {course.title}
              </a>{" "}
              <span className="text-sm text-gray-500">({course.platform})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
