"use client";
import { useRouter } from "next/navigation";
import {
  capitalize,
  joinQuestion,
  makeQuestionLink,
} from "app/functions/Utils";
import React from "react";

export default function SubmissionBox({ submission }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${window.location.pathname}/${submission.submission_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex justify-between px-4 py-2 border-b-2 border-b-gray-700"
    >
      <div className="flex flex-col">
        <span
          className={`font-semibold ${
            submission.type.toLowerCase() === "accepted" ? "text-green-600" : ""
          }
          ${
            submission.type.toLowerCase() === "rejected" ? "text-red-600" : ""
          }`}
        >
          {capitalize(submission.type)}
        </span>
        <span className="text-gray-500">Language: {submission.language}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-semibold text-gray-700">
          Memory: {submission.memory}
        </span>
        <span className="text-gray-500">Runtime: {submission.runtime}</span>
      </div>
    </div>
  );
}
