import React from "react";

export default function ProblemName({ problem, setProblem }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Problem Name</h1>
      <input
        type="text"
        placeholder="Enter Problem Name..."
        className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
        value={problem}
        onChange={(e) => {
          let temp = "";
          setProblem(temp + e.target.value);
        }}
      />
    </div>
  );
}
