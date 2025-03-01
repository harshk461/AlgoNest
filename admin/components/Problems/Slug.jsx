import React from "react";

export default function Slug({ slug, setSlug }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Slug</h1>
      <input
        type="text"
        placeholder="Enter Slug..."
        className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
        value={slug}
        onChange={(e) => {
          setSlug(e.target.value);
        }}
      />
    </div>
  );
}
