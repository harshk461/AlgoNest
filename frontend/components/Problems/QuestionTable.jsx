import React from "react";
import { CircleCheckBig, FileVideo, Rocket } from "lucide-react";

export default function QuestionTable() {
  const questions = [
    {
      status: true,
      question: "Longest Increasing Subsequence",
      solution: true,
      acceptance: "43.6%",
      difficulty: "Medium",
    },
    {
      status: false,
      question: "Two Sum",
      solution: true,
      acceptance: "45.2%",
      difficulty: "Easy",
    },
    {
      status: true,
      question: "Binary Tree Maximum Path Sum",
      solution: false,
      acceptance: "28.7%",
      difficulty: "Hard",
    },
    {
      status: true,
      question: "Median of Two Sorted Arrays",
      solution: true,
      acceptance: "29.1%",
      difficulty: "Hard",
    },
    {
      status: false,
      question: "Climbing Stairs",
      solution: true,
      acceptance: "47.8%",
      difficulty: "Easy",
    },
    {
      status: true,
      question: "Word Break",
      solution: true,
      acceptance: "39.5%",
      difficulty: "Medium",
    },
    {
      status: true,
      question: "Valid Parentheses",
      solution: true,
      acceptance: "57.2%",
      difficulty: "Easy",
    },
    {
      status: false,
      question: "Merge Intervals",
      solution: false,
      acceptance: "41.6%",
      difficulty: "Medium",
    },
    {
      status: true,
      question: "Linked List Cycle",
      solution: true,
      acceptance: "49.7%",
      difficulty: "Easy",
    },
    {
      status: true,
      question: "Course Schedule",
      solution: true,
      acceptance: "40.4%",
      difficulty: "Medium",
    },
  ];
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
                {item.status && <CircleCheckBig color="#6DC177" />}
              </td>
              <td className="px-4 py-4">{item.question}</td>
              <td className="px-4 py-4 text-start">
                {item.solution && <FileVideo color="purple" />}
              </td>
              <td className="px-4 py-4 text-start">{item.acceptance}</td>
              <td
                className={`px-4 py-4 text-start
                    ${item.difficulty === "Medium" && "text-yellow-400"}
                    ${item.difficulty === "Easy" && "text-green-400"}
                    ${item.difficulty === "Hard" && "text-red-500"}`}
              >
                {item.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
