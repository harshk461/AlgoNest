"use client";

import MultipleSelect from "@/components/Common/MultipleSelect";
import Navbar from "@/components/Navbar";
import SingleSelect from "@/components/Common/SingleSelect";
import { capitalize } from "@/utils/capitalize";
import axios from "axios";
import { Lightbulb, Tag } from "lucide-react";
import React, { useState } from "react";
import { TestcaseInputSection } from "@/components/Problems/Testcases";
import Slug from "@/components/Problems/Slug";
import ProblemName from "@/components/Problems/ProblemName";
import Description from "@/components/Problems/Description";
import Constraints from "@/components/Problems/Constraints";
import Hints from "@/components/Problems/Hints";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function Page() {
  const [problem, setProblem] = useState("");
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [desc, setDesc] = useState("");
  const [descriptions, setDescriptions] = useState([]);

  const [tsc, setTsc] = useState({
    inputs: [{ key: "", value: "" }], // Ensure this is an array
    output: "",
    explanation: "",
  });
  const [testcases, setTestcases] = useState([]);

  const [cons, setCons] = useState("");
  const [constraints, setConstraints] = useState([]);

  const [hint, setHint] = useState("");
  const [hints, setHints] = useState([]);

  const [topics, setTopics] = useState([]);
  const topicOptions = [
    { value: "arrays", label: "Arrays" },
    { value: "linked_lists", label: "Linked Lists" },
    { value: "stacks", label: "Stacks" },
    { value: "queues", label: "Queues" },
    { value: "hashing", label: "Hashing" },
    { value: "recursion", label: "Recursion" },
    { value: "trees", label: "Trees" },
    { value: "graphs", label: "Graphs" },
    { value: "dynamic_programming", label: "Dynamic Programming" },
    { value: "greedy", label: "Greedy Algorithms" },
    { value: "backtracking", label: "Backtracking" },
    { value: "bit_manipulation", label: "Bit Manipulation" },
    { value: "tries", label: "Tries" },
    { value: "segment_trees", label: "Segment Trees" },
    { value: "disjoint_set", label: "Disjoint Set" },
    { value: "binary_search", label: "Binary Search" },
    { value: "sliding_window", label: "Sliding Window" },
    { value: "two_pointers", label: "Two Pointers" },
    { value: "math", label: "Maths" },
  ];

  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const token = useSelector((state) => state.auth.token);

  const handleAddProblem = async () => {
    try {
      setLoading(true);
      const problemDTO = {
        question: problem,
        acceptance: "N/A",
        difficulty,
        topics,
        sheets: [],
        descriptions,
        testcases: testcases.map(({ input, output, explanation }) => ({
          input,
          output,
          explanation: explanation || undefined,
        })),
        constraints,
        slug,
        hints,
      };
      await axios.post(
        "http://localhost:3090/problems/add-problem",
        problemDTO,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate.replace("/all-problems");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <div className="w-full h-screen flex flex-col bg-gray-900 text-gray-200">
        <Navbar />
        <div className="flex w-full h-full gap-6 p-6 overflow-hidden">
          {/* Left Section */}
          <div className="w-full h-full flex flex-col gap-6 overflow-y-auto bg-gray-800 rounded-lg p-6 shadow-lg">
            {/* Problem Name */}
            <ProblemName problem={problem} setProblem={setProblem} />

            {/* Slug */}
            <Slug slug={slug} setSlug={setSlug} />

            {/* Difficulty */}
            <div className="w-full flex flex-col gap-3">
              <h1 className="text-xl font-bold">Difficulty</h1>
              <SingleSelect
                value={difficulty}
                setValue={setDifficulty}
                placeholder={"Select Difficulty"}
                options={["Easy", "Medium", "Hard"]}
              />
            </div>

            {/* Description */}
            <Description
              desc={desc}
              descriptions={descriptions}
              setDesc={setDesc}
              setDescriptions={setDescriptions}
            />

            {/* Testcases */}
            <TestcaseInputSection
              tsc={tsc}
              setTsc={setTsc}
              testcases={testcases}
              setTestcases={setTestcases}
            />

            {/* Constraints */}
            <Constraints
              cons={cons}
              setCons={setCons}
              constraints={constraints}
              setConstraints={setConstraints}
            />

            {/* Topics */}
            <div className="w-full flex flex-col gap-3">
              <h1 className="text-xl font-bold">Topics</h1>
              <MultipleSelect
                options={topicOptions}
                selectedValues={topics}
                onChange={setTopics}
                placeholder="Select topics"
              />
            </div>

            {/* Hints */}
            <Hints
              hint={hint}
              hints={hints}
              setHint={setHint}
              setHints={setHints}
            />

            {/* Add Problem Button */}
            <button
              onClick={handleAddProblem}
              className={`px-8 py-2 rounded-lg ${
                loading ? "bg-gray-700" : "bg-teal-500 hover:bg-teal-600"
              } text-white font-bold transition-all`}
            >
              {loading ? "Loading..." : "Add Problem"}
            </button>
          </div>

          {/* Right Section */}
          <div className="w-full h-full overflow-y-auto bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-bold">
                {problem || "Problem Name..."}
              </h1>
              <p className="text-lg">
                Problem Link:
                <span className="px-4 font-semibold text-teal-400">
                  {"http://localhost:3000/problem/" + slug}
                </span>
              </p>
              <h1
                className={`font-bold ${
                  difficulty.toLowerCase() === "medium"
                    ? "text-yellow-400"
                    : difficulty.toLowerCase() === "easy"
                    ? "text-green-400"
                    : difficulty.toLowerCase() === "hard"
                    ? "text-red-500"
                    : ""
                }`}
              >
                {difficulty ? capitalize(difficulty) : "Difficulty"}
              </h1>

              {/* Descriptions */}
              <div dangerouslySetInnerHTML={{ __html: descriptions }} />

              {/* Testcases */}
              {testcases.map((item, index) => (
                <div key={index} className="border-l border-teal-500 pl-4">
                  <p className="font-bold">Example {index + 1}</p>
                  <p>Input: {JSON.stringify(item.input)}</p>
                  <p>Output: {item.output}</p>
                  {item.explanation && <p>Explanation: {item.explanation}</p>}
                </div>
              ))}

              {/* Constraints */}
              {constraints.length > 0 && (
                <>
                  <h2 className="text-xl font-bold">Constraints:</h2>
                  <ul className="list-disc ml-6">
                    {constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Topics */}
              {topics.length > 0 && (
                <>
                  <h2 className="text-xl font-bold">Topics:</h2>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-4 py-2 bg-teal-700 text-white rounded-lg"
                      >
                        {capitalize(topic)}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Hints */}
              {hints.length > 0 && (
                <>
                  <h2 className="text-xl font-bold">Hints:</h2>
                  {hints.map((hint, index) => (
                    <p key={index}>{hint}</p>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
