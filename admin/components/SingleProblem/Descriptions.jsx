import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Heading from "../Common/Heading";
import Editor from "../TextEditor";
import Button from "../Common/Button";

export default function Descriptions({ description, onClick }) {
  const [desc, setDesc] = useState(description);

  return (
    <Wrapper>
      <Heading heading={"Description"} />
      <div className="h-[300px] w-full">
        <Editor value={desc} setValue={setDesc} className={"text-white"} />
      </div>
      <Button
        title={"Update"}
        onClick={() => {
          onClick(desc);
        }}
      />
    </Wrapper>
  );
}
