"use client";

import Navbar from "@/components/Navbar";
import { capitalize } from "@/utils/capitalize";
import { Lightbulb, Tag } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [problem, setProblem] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [desc, setDesc] = useState("");
  const [descriptions, setDescriptions] = useState([]);

  const [explanation, setExplaination] = useState("");
  const [tsc, setTsc] = useState({
    input: "",
    output: "",
  });
  const [testcases, setTestcases] = useState([]);

  const [cons, setCons] = useState("");
  const [constraints, setConstraints] = useState([]);

  const [hint, setHint] = useState("");
  const [hints, setHints] = useState([]);

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex w-full h-full gap-4 p-4 overflow-hidden">
        <div className="w-full h-full flex flex-col gap-3 overflow-y-auto bg-secondary rounded-xl p-4">
          {/* Problem Name */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Problem Name</h1>
            <input
              type="text"
              placeholder="Enter Problem Name..."
              className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
              value={problem}
              onChange={(e) => {
                let temp = "";
                setProblem(temp + e.target.value);
              }}
            />
          </div>

          {/* Difficulty */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Difficulty</h1>
            <input
              type="text"
              placeholder="Enter Difficulty..."
              className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
              value={difficulty}
              onChange={(e) => {
                let temp = "";
                setDifficulty(temp + e.target.value);
              }}
            />
          </div>

          {/* Description */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Description</h1>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)} // Correct setDesc
              placeholder="Enter Description (You can also use html tags with tailwind)"
              className="max-h-[300px] min-h-[100px] bg-background text-foreground px-4 py-3 rounded-lg resize-x-none outline-none"
            />
            <button
              onClick={() => {
                if (desc.trim().length > 0) {
                  setDescriptions([...descriptions, desc]); // Correct use of setDescriptions
                  setDesc("");
                }
              }}
              className="self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
            >
              Add
            </button>
          </div>

          {/* Testcases */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Testcases</h1>
            <div className="w-full my-2 flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Input</h1>
              <input
                type="text"
                placeholder="Enter Input..."
                className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
                value={tsc.input}
                onChange={(e) => {
                  setTsc((pre) => ({
                    ...pre,
                    input: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full my-2 flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Output</h1>
              <input
                type="text"
                placeholder="Enter Output..."
                className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
                value={tsc.output}
                onChange={(e) => {
                  setTsc((pre) => ({
                    ...pre,
                    output: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full my-2 flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Explanation (Optional)</h1>
              <input
                type="text"
                placeholder="Enter Explanation..."
                className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
                value={explanation}
                onChange={(e) => {
                  setExplaination(e.target.value);
                  setTsc((pre) => ({
                    ...pre,
                    explanation: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              onClick={() => {
                const newTsc = { ...tsc };
                if (newTsc.explanation?.trim().length === 0) {
                  delete newTsc.explanation;
                }
                if (newTsc.input.trim() === "" || newTsc.output.trim() === "")
                  return;

                setTestcases((pre) => [...pre, newTsc]);

                setTsc({ input: "", output: "", explanation: "" });
              }}
              className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
            >
              Add
            </button>
          </div>

          {/* Constraints */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Constraints</h1>
            <div className="w-full flex gap-4">
              <input
                type="text"
                placeholder="Enter Constraints..."
                className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
                value={cons}
                onChange={(e) => {
                  let temp = "";
                  setCons(temp + e.target.value);
                }}
              />

              <button
                onClick={() => {
                  if (cons.trim().length > 0) {
                    setConstraints([...constraints, cons]);
                    setCons("");
                  }
                }}
                className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Topics */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Topics</h1>
            <div className="w-full flex gap-4">
              <input
                type="text"
                placeholder="Enter Topics..."
                className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
                value={topic}
                onChange={(e) => {
                  let temp = "";
                  setTopic(temp + e.target.value);
                }}
              />

              <button
                onClick={() => {
                  if (topic.trim().length > 0) {
                    setTopics([...topics, topic]);
                    setTopic("");
                  }
                }}
                className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Hints */}
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-lg font-semibold">Hints(Optional)</h1>
            <div className="w-full flex gap-4">
              <input
                type="text"
                placeholder="Enter Hints..."
                className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
                value={hint}
                onChange={(e) => {
                  let temp = "";
                  setHint(temp + e.target.value);
                }}
              />

              <button
                onClick={() => {
                  if (hint.trim().length > 0) {
                    setHints([...hints, hint]);
                    setHint("");
                  }
                }}
                className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          <button className="px-8 py-2 rounded-lg bg-background w-fit self-center text-lg font-semibold my-4">
            Add Problem
          </button>
        </div>
        <div className="w-full h-full overflow-y-auto bg-secondary rounded-xl">
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-3xl font-semibold">
              {problem || "Problem Name..."}
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
                    <div className="flex gap-3">
                      <h1 className="font-bold text-white">Input:</h1>
                      <h1>{item.input}</h1>
                    </div>
                    <div className="flex gap-3">
                      <h1 className="font-bold text-white">Output:</h1>
                      <h1>{item.output}</h1>
                    </div>
                    {item.explanation && (
                      <div className="flex gap-3">
                        <h1 className="font-bold text-white">Explanation:</h1>
                        <h1>{item.explanation}</h1>
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
