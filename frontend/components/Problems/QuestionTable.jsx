import React from "react";
import { CircleCheckBig, FileVideo, Rocket } from "lucide-react";
import { capitalize, splitQuestion } from "@/app/functions/Utils";
import Link from "next/link";

export default function QuestionTable({ questions }) {
  return (
    <div className="w-full overflow-auto bg-[#1A1A1A]">
      <table className="w-full table-fixed">
        <thead>
          <tr className="text-lg text-txt_secondary border-b-4 border-b-secondary">
            <th className="w-[100px] px-4 py-2  text-start">Status</th>
            <th className="w-full px-4 py-2  text-start">Title</th>
            <th className="w-[150px] px-4 py-2  text-start">Solution</th>
            <th className="w-[150px] px-4 py-2  text-start">Acceptance</th>
            <th className="w-[180px] px-4 py- text-start">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 !== 0 ? "bg-[#2A2A2A]" : "bg-transparent"}
                  font-semibold`}
            >
              <td className="px-4 py-4 text-start">
                {item.isSolved && <CircleCheckBig color="#6DC177" />}
              </td>
              <td className="px-4 py-4">
                <Link href={"/problems/" + splitQuestion(item.question)}>
                  {item.question}
                </Link>
              </td>
              <td className="px-4 py-4 text-start">
                {item.solution && <FileVideo color="purple" />}
              </td>
              <td className="px-4 py-4 text-start">{item.acceptance}</td>
              <td
                className={`px-4 py-4 text-start
                    ${item.difficulty === "medium" && "text-yellow-400"}
                    ${item.difficulty === "easy" && "text-green-400"}
                    ${item.difficulty === "hard" && "text-red-500"}`}
              >
                {capitalize(item.difficulty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
