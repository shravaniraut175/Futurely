"use client";
// import { useEffect, useState } from "react";

// const CourseDashboardAI = ({ skill }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!skill) return;

//     setLoading(true);
//     setError("");
//     fetch(`/api/courses?skill=${encodeURIComponent(skill)}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch courses");
//         return res.json();
//       })
//       .then((data) => {
//         setCourses(data);
//       })
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [skill]);

//   if (loading) return <p>Loading course recommendations...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (courses.length === 0) return <p>No courses found for {skill}</p>;

//   return (
//     <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
//       {courses.map((course, idx) => (
//         <a
//           key={idx}
//           href={course.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             width: 220,
//             textDecoration: "none",
//             color: "inherit",
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             overflow: "hidden",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//           }}
//         >
//           <img
//             src={course.image_url}
//             alt={course.title}
//             style={{ width: "100%", height: 120, objectFit: "cover" }}
//           />
//           <div style={{ padding: 10 }}>
//             <h3 style={{ fontSize: 16, marginBottom: 6 }}>{course.title}</h3>
//             <p style={{ color: "#555", fontSize: 14 }}>{course.platform}</p>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default CourseDashboardAI;



import { useState } from "react";

export default function SkillCourses({ skill }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourseszz = async () => {
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
// import { useEffect, useState } from "react";

// interface Course {
//   title: string;
//   platform: string;
//   url: string;
//   image_url: string;
// }

// const CourseDashboardAI = ({ skill }: { skill: string }) => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!skill) return;

//     setLoading(true);
//     setError("");
//     fetch(`/api/courses?skill=${encodeURIComponent(skill)}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch courses");
//         return res.json();
//       })
//       .then((data) => {
//         setCourses(data);
//       })
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [skill]);

//   if (loading) return <p>Loading course recommendations...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (courses.length === 0) return <p>No courses found for {skill}</p>;

//   return (
//     <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
//       {courses.map((course, idx) => (
//         <a
//           key={idx}
//           href={course.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             width: 220,
//             textDecoration: "none",
//             color: "inherit",
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             overflow: "hidden",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//           }}
//         >
//           <img
//             src={course.image_url}
//             alt={course.title}
//             style={{ width: "100%", height: 120, objectFit: "cover" }}
//           />
//           <div style={{ padding: 10 }}>
//             <h3 style={{ fontSize: 16, marginBottom: 6 }}>{course.title}</h3>
//             <p style={{ color: "#555", fontSize: 14 }}>{course.platform}</p>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default CourseDashboardAI;

