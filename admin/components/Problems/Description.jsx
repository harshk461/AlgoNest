import React from "react";

export default function Description({
  desc,
  descriptions,
  setDesc,
  setDescriptions,
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Description</h1>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)} // Correct setDesc
        placeholder="Enter Description (You can also use html tags with tailwind)"
        className="max-h-[300px] min-h-[100px] bg-background text-foreground px-4 py-3 rounded-lg resize-x-none outline-none"
      />
      <button
        onClick={() => {
          if (desc.trim().length > 0) {
            setDescriptions([...descriptions, desc]); // Correct use of setDescriptions
            setDesc("");
          }
        }}
        className="self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
      >
        Add
      </button>
    </div>
  );
}
