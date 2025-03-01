import React from "react";

export default function Hints({ hint, hints, setHint, setHints }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Hints(Optional)</h1>
      <div className="w-full flex gap-4">
        <input
          type="text"
          placeholder="Enter Hints..."
          className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
          value={hint}
          onChange={(e) => {
            let temp = "";
            setHint(temp + e.target.value);
          }}
        />

        <button
          onClick={() => {
            if (hint.trim().length > 0) {
              setHints([...hints, hint]);
              setHint("");
            }
          }}
          className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
}
