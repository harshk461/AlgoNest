import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Heading from "../Common/Heading";
import SingleSelect from "../Common/SingleSelect";
import { capitalize } from "@/utils/capitalize";
import Button from "../Common/Button";
import { updateProblem } from "@/actions/update-problem";

export default function Difficulty({ difficulty, onClick }) {
  const [diff, setDiff] = useState(difficulty);
  return (
    <Wrapper>
      <Heading heading={"Difficulty"} />
      <SingleSelect
        value={diff}
        setValue={setDiff}
        options={["easy", "medium", "hard"]}
        placeholder={capitalize(difficulty)}
        className={"border-2 border-foreground"}
      />
      <Button title={"Update"} onClick={() => onClick(diff)} />
    </Wrapper>
  );
}
