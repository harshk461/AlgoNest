import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Heading from "../Common/Heading";
import Button from "../Common/Button";

export default function Slug({ slug, onClick }) {
  const [newSlug, setnewSlug] = useState(slug);
  return (
    <Wrapper>
      <Heading heading={"Slug"} />
      <input
        type="text"
        value={newSlug}
        onChange={(e) => setnewSlug(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-primary text-black outline-none"
      />
      <Button title={"Update"} onClick={() => onClick(newSlug)} />
    </Wrapper>
  );
}
