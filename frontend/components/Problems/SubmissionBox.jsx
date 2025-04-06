"use client";
import { useRouter } from "next/navigation";
import {
  capitalize,
  joinQuestion,
  makeQuestionLink,
} from "app/functions/Utils";
import React from "react";
import { Clock, Database, Code, CheckCircle, XCircle } from "lucide-react";

export default function SubmissionBox({ submission }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${window.location.pathname}/${submission.submission_id}`);
  };

  // Helper function to get status icon and color
  const getStatusInfo = (type) => {
    const typeLC = type.toLowerCase();
    if (typeLC === "accepted") {
      return {
        icon: <CheckCircle size={16} className="text-green-400" />,
        textColor: "text-green-400",
        bgColor: "bg-green-900/30",
        borderColor: "border-green-800/50",
      };
    } else if (typeLC === "rejected") {
      return {
        icon: <XCircle size={16} className="text-red-400" />,
        textColor: "text-red-400",
        bgColor: "bg-red-900/30",
        borderColor: "border-red-800/50",
      };
    } else {
      return {
        icon: <Clock size={16} className="text-yellow-400" />,
        textColor: "text-yellow-400",
        bgColor: "bg-yellow-900/30",
        borderColor: "border-yellow-800/50",
      };
    }
  };

  const statusInfo = getStatusInfo(submission.type);

  return (
    <div
      onClick={handleClick}
      className="w-full flex justify-between p-4 bg-[#0E0E16] border border-gray-800 rounded-lg mb-2 hover:border-indigo-800/50 cursor-pointer transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border`}
        >
          {statusInfo.icon}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${statusInfo.textColor}`}>
              {capitalize(submission.type)}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
            <Code size={14} />
            <span>Language: {submission.language}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center">
        <div className="flex items-center gap-2 text-gray-300 mb-1">
          <Database size={14} className="text-indigo-400" />
          <span>Memory: {submission.memory}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Clock size={14} className="text-purple-400" />
          <span>Runtime: {submission.runtime}</span>
        </div>
      </div>
    </div>
  );
}
