"use client";

import React, { useState } from "react";
import PracticeCourse from "./PracticeCourse";
import QuestionCategory from "./QuestionCategory";
import { questions } from "@/data/Data";
export default function PracticeComponent() {
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
        <div className="w-full flex flex-col my-4">
          <QuestionCategory topic="All" questions={questions} />
        </div>
      </div>
    </div>
  );
}
