import React, { use, useState } from "react";

export default function ProblemName({ name }) {
  const [problem, setProlem] = useState(name);
  return (
    <div
      className="flex-1 h-fit p-4 rounded-xl border-[1px] border-secondary
     flex flex-col justify-center items-center gap-4"
    >
      <h1 className="text-3xl font-bold">Problem Name</h1>
      <input
        type="text"
        value={problem}
        onChange={(e) => setProlem(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-primary text-black outline-none"
      />
      <button className="px-6 py-2 rounded-lg bg-foreground text-secondary font-semibold">
        Update
      </button>
    </div>
  );
}
