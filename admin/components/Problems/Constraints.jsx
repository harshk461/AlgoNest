import React from "react";

export default function Constraints({
  cons,
  constraints,
  setCons,
  setConstraints,
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Constraints</h1>
      <div className="w-full flex gap-4">
        <input
          type="text"
          placeholder="Enter Constraints..."
          className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
          value={cons}
          onChange={(e) => {
            let temp = "";
            setCons(temp + e.target.value);
          }}
        />

        <button
          onClick={() => {
            if (cons.trim().length > 0) {
              setConstraints([...constraints, cons]);
              setCons("");
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
