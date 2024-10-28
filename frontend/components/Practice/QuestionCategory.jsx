"use client";

import React, { useState } from "react";
import Collapsible from "./collapsible";
import { CircleCheckBig, FileVideo, Rocket } from "lucide-react";
import QuestionTable from "../Problems/QuestionTable";

export default function QuestionCategory() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col">
      <Collapsible title="Question 1">
        <QuestionTable />
      </Collapsible>
    </div>
  );
}
