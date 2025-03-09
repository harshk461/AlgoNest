"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function Editor({ value, setValue, className }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code"],
    ],
  };

  const formats = ["bold", "italic", "underline", "strike", "code", "list"];

  return (
    <div className="w-full h-full flex flex-col">
      {/* This div will contain both the toolbar and editor */}
      <div
        className="quill-wrapper"
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
          onChange={(e) => {
            setValue(e);
          }}
          placeholder="Enter the message..."
          className={`${className}`}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        />
      </div>
    </div>
  );
}
