"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p className="text-gray-500">Loading editor...</p>,
});

export default function Editor({ value, setValue, className }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["code"], // Code block
    ],
  };

  const formats = ["bold", "italic", "underline", "strike", "code", "list"];

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {/* Editor Wrapper */}
      <div
        className="quill-wrapper bg-gray-800 text-gray-200 rounded-lg shadow-lg p-4"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ReactQuill
          modules={modules}
          formats={formats}
          value={value}
          onChange={(e) => setValue(e)}
          placeholder="Start typing here..."
          className="quill-editor bg-gray-900 text-gray-200 rounded-md"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #4A5568",
            borderRadius: "0.5rem",
          }}
        />
      </div>
    </div>
  );
}
