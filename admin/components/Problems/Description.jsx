import React from "react";
import Editor from "../TextEditor";

export default function Description({ descriptions, setDescriptions }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Description</h1>
      <div className="w-full h-[400px]">
        <Editor value={descriptions} setValue={setDescriptions} />
      </div>
    </div>
  );
}
