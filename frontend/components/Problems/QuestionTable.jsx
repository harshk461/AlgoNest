import React from "react";
import { CheckCircle, FileVideo, Rocket, Lock } from "lucide-react";
import Link from "next/link";
import { capitalize, makeQuestionLink } from "app/functions/Utils";

export default function QuestionTable({ questions }) {
  return (
    <div className="w-full overflow-x-auto bg-[#0E0E16] rounded-lg border border-gray-800">
      <table className="w-full">
        <thead>
          <tr className="text-sm text-gray-400 border-b border-gray-800">
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Solution</th>
            <th className="px-4 py-3 text-left">Acceptance</th>
            <th className="px-4 py-3 text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#1A1A24]" : "bg-[#0E0E16]"
              } hover:bg-[#2A2A36] transition-colors`}
            >
              <td className="px-4 py-4">
                {item.isSolved ? (
                  <CheckCircle size={20} className="text-green-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                )}
              </td>
              <td className="px-4 py-4">
                <Link
                  href={`/problems/${item.slug}`}
                  className="text-gray-200 hover:text-purple-400 transition-colors font-medium"
                >
                  {item.question}
                </Link>
              </td>
              <td className="px-4 py-4">
                {item.solution ? (
                  <FileVideo size={20} className="text-purple-400" />
                ) : (
                  <Lock size={20} className="text-gray-600" />
                )}
              </td>
              <td className="px-4 py-4 text-gray-400">{item.acceptance}</td>
              <td className="px-4 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.difficulty.toLowerCase() === "easy"
                      ? "bg-green-900/30 text-green-400"
                      : item.difficulty.toLowerCase() === "medium"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {capitalize(item.difficulty)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
