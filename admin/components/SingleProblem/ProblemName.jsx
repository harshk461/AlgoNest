import React, { use, useState } from "react";
import Wrapper from "./Wrapper";
import Heading from "../Common/Heading";
import Button from "../Common/Button";

export default function ProblemName({ name, onClick }) {
  const [problem, setProblem] = useState(name);

  return (
    <Wrapper>
      <Heading heading={"Problem Name"} />
      <input
        type="text"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-primary text-black outline-none"
      />
      <Button onClick={() => onClick(problem)} title="Update" />
    </Wrapper>
  );
}
