"use client";

import React, { useState } from "react";
import Collapsible from "./collapsible";
import QuestionTable from "../Problems/QuestionTable";

export default function QuestionCategory({ title, questions }) {
  return (
    <div className="w-full h-auto flex flex-col">
      <Collapsible title={title}>
        <QuestionTable questions={questions} />
      </Collapsible>
    </div>
  );
}
