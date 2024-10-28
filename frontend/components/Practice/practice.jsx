"use client";

import React, { useState } from "react";
import PracticeCourse from "./PracticeCourse";
import { ExpansionPanel, usePanels } from "@react-md/expansion-panel";
import { Typography } from "@react-md/typography";
import QuestionCategory from "./QuestionCategory";

export default function PracticeComponent() {
  const [[panel1, panel2]] = usePanels({
    idPrefix: "configureing-panel",
    count: 2,
    multiple: true,
  });
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-[1200px] m-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Courses</h1>
          <div className="w-full flex justify-between gap-[20px]">
            <PracticeCourse />
            <PracticeCourse />
            <PracticeCourse />
          </div>
        </div>

        {/* Sheet Questions */}
        <div className="w-full flex flex-col mt-4">
          <QuestionCategory />
          <QuestionCategory />
        </div>
      </div>
    </div>
  );
}
