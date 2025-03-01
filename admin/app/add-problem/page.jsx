"use client";

import MultipleSelect from "@/components/Problems/MultipleSelect";
import Navbar from "@/components/Navbar";
import SingleSelect from "@/components/Problems/SingleSelect";
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

  const handleAddProblem = async () => {
    try {
      setLoading(true);
      const problemDTO = {
        question: problem,
        acceptance: "N/A",
        difficulty: difficulty,
        topics: topics,
        sheets: [],
        descriptions: descriptions.map((text) => ({ text })),
        testcases: testcases.map(({ input, output, explanation }) => ({
          input,
          output,
          explanation: explanation || undefined,
        })),
        constraints: constraints,
        slug: slug,
        hints: hints,
      };
      console.log(problemDTO);
      await axios.post(
        "http://localhost:3090/problems/add-problem",
        problemDTO
      );
    } catch (e) {
      console.log(e);
      // alert(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col">
      <div className="flex w-full h-full gap-4 p-4 overflow-hidden">
        <div className="w-full h-full flex flex-col gap-3 overflow-y-auto bg-secondary rounded-xl p-4">
          {/* Problem Name */}
          <ProblemName problem={problem} setProblem={setProblem} />
          {/* {Slug} */}
          <Slug slug={slug} setSlug={setSlug} />

          {/* Difficulty */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Difficulty</h1>
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
            <h1 className="text-lg font-semibold">Topics</h1>
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
          <button
            onClick={handleAddProblem}
            className="px-8 py-2 rounded-lg bg-background w-fit self-center text-lg font-semibold my-4"
          >
            Add Problem
          </button>
        </div>

        <div className="w-full h-full overflow-y-auto bg-secondary rounded-xl">
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-3xl font-semibold">
              {problem || "Problem Name..."}
            </h1>
            <h1>
              Problem Link:
              <span className="px-4 font-semibold">
                {"http://localhost:3000/problem/" + slug}
              </span>
            </h1>
            <h1
              className={`font-bold ${
                difficulty.toLowerCase() === "medium" ? "text-yellow-400" : ""
              } ${
                difficulty.toLowerCase() === "easy" ? "text-green-400" : ""
              } ${difficulty.toLowerCase() === "hard" ? "text-red-500" : ""}`}
            >
              {difficulty ? capitalize(difficulty) : "Difficulty"}
            </h1>
            <div className="w-full text-[17px] font-[400] flex flex-col gap-3">
              {descriptions.length > 0 ? (
                descriptions.map((item, index) => (
                  <h1 dangerouslySetInnerHTML={{ __html: item }} key={index} />
                ))
              ) : (
                <h1 className="text-lg font-semibold">Add a description...</h1>
              )}
            </div>

            {/* Testcases */}
            <div className="w-full flex flex-col gap-8 mt-8">
              {testcases.map((item, index) => (
                <div key={index} className="w-full flex flex-col gap-4">
                  <h1 className="text-md font-semibold">
                    Example {index + 1}:
                  </h1>
                  <div className="w-full pl-3 flex flex-col gap-4 border-l-2 border-l-[#555454]">
                    {/* Input Section */}
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold text-white">Input:</h1>
                      <div className="px-3 py-2 rounded-md flex flex-col gap-2">
                        {Object.entries(item.input).map(([key, value]) => (
                          <div key={key} className="flex gap-3">
                            <span className="font-semibold">{key}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Output Section */}
                    <div className="flex gap-3">
                      <h1 className="font-bold text-white">Output:</h1>
                      <span className="text-white">{item.output}</span>
                    </div>

                    {/* Explanation Section (if exists) */}
                    {item.explanation && (
                      <div className="flex gap-3">
                        <h1 className="font-bold text-white">Explanation:</h1>
                        <span className="text-white">{item.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            {constraints.length > 0 && (
              <div className="flex flex-col gap-4 mt-6">
                <h1 className="text-lg font-semibold">Constraints:</h1>
                <ul className="list-disc list-inside ml-4 space-y-4">
                  {constraints.map((item, index) => (
                    <li key={index}>
                      <h1 className="bg-background text-foreground inline-block px-3 rounded-lg">
                        {item}
                      </h1>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Topics */}
            {topics.length > 0 && (
              <div className="w-full border-b-4 border-b-background cursor-pointer px-4">
                <div className="flex gap-4 items-center text-[#c9c9c9]">
                  <Tag />
                  <h1 className="text-md font-semibold">Topics</h1>
                </div>
                <div className="flex flex-wrap gap-4 px-4 py-3">
                  {topics.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-1 rounded-full text-[15px] bg-[#353535] hover:text-white"
                    >
                      {capitalize(item)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hints */}
            {hints.length > 0 && (
              <div className="flex flex-col gap-4">
                {hints.map((item, index) => (
                  <div
                    key={index}
                    className="w-full border-b-4 border-b-background"
                  >
                    <div className="flex px-4">
                      <div className="flex gap-4 items-center text-[#c9c9c9]">
                        <Lightbulb />
                        <h1 className="text-md font-semibold">
                          Hint {index + 1}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-col text-md">
                      <h1 className="px-4 py-2">{item}</h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
