// "use client";

// import React from "react";
// import MDEditor from "@uiw/react-md-editor";

// const CoverLetterPreview = ({ content }) => {
//   return (
//     <div className="py-4">
//       <MDEditor value={content} preview="preview" height={700} />
//     </div>
//   );
// };

// export default CoverLetterPreview;
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4 prose max-w-full">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default CoverLetterPreview;
