"use client";

import useBase from "@/hooks/useBase";
import { capitalize } from "app/functions/Utils";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Tag,
  Code,
  ExternalLink,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Description() {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const { problem } = useParams();
  const [isOpen, setIsOpen] = useState([]);
  const contentRefs = useRef([]);
  const [topic, setTopic] = useState(false);
  const topicRef = useRef();

  const toggleCollapse = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const apiUrl = useBase();
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/problems/get-problem?slug=${problem}`
      );

      // Parse the question data
      const questionData = res.data.problem;

      // If the response is an array, take the first item
      const parsedQuestion = Array.isArray(questionData)
        ? questionData[0]
        : questionData;

      setQuestion(parsedQuestion);
      setIsOpen(Array(parsedQuestion.hints?.length || 0).fill(false));
      contentRefs.current = Array(parsedQuestion.hints?.length || 0)
        .fill()
        .map((_, i) => contentRefs.current[i] || React.createRef());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    const difficultyMap = {
      easy: "text-green-400 bg-green-900/30 border-green-800/50",
      medium: "text-yellow-400 bg-yellow-900/30 border-yellow-800/50",
      hard: "text-red-400 bg-red-900/30 border-red-800/50",
    };
    return difficultyMap[difficulty?.toLowerCase()] || "text-gray-400";
  };

  // Parse topics from string to array if needed
  const getTopicsArray = (topics) => {
    if (!topics) return [];
    return typeof topics === "string"
      ? topics.split(",").map((t) => t.trim())
      : topics;
  };

  if (loading) {
    return (
      <div className="w-full flex p-4 flex-col gap-4 rounded-b-2xl">
        <div className="w-full p-[30px] rounded-xl animate-pulse bg-[#1A1A1A]"></div>
        <div className="w-full h-[80px] rounded-xl animate-pulse bg-[#1A1A1A]"></div>
        <div className="w-full p-[100px] rounded-xl animate-pulse bg-[#1A1A1A]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-black rounded-xl border border-gray-800">
      {/* Problem Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
              question.difficulty
            )}`}
          >
            {capitalize(question.difficulty || "")}
          </div>
          {question.acceptance && question.acceptance !== "N/A" && (
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50">
              Acceptance: {question.acceptance}
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          {question.question}
        </h1>

        <div className="flex flex-wrap gap-2">
          {getTopicsArray(question.topics).map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[#1A1A1A] text-gray-300"
            >
              {capitalize(topic)}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Description */}
      <div className="w-full text-gray-300 text-lg leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: question.descriptions }} />
      </div>

      {/* Test Cases */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Code size={20} className="text-purple-400" />
          Examples
        </h2>

        <div className="space-y-6">
          {question.testcases &&
            question.testcases.map((testcase, index) => (
              <div
                key={index}
                className="bg-black rounded-lg border border-gray-800 overflow-hidden"
              >
                <div className="bg-[#1A1A1A] px-4 py-2 border-b border-gray-800">
                  <h3 className="font-medium">Example {index + 1}</h3>
                </div>

                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">Input:</div>
                    <div className="bg-[#1A1A1A] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      {Object.entries(testcase.input || {}).map(
                        ([key, value]) => (
                          <div key={key}>
                            {key}: {value}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">Output:</div>
                    <div className="bg-[#1A1A1A] p-3 rounded-lg font-mono text-sm">
                      {testcase.output}
                    </div>
                  </div>

                  {testcase.explanation && (
                    <div className="space-y-2">
                      <div className="text-gray-400 text-sm">Explanation:</div>
                      <div className="bg-[#1A1A1A] p-3 rounded-lg text-sm">
                        {testcase.explanation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Constraints */}
      {question.constraints && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-purple-400" />
            Constraints
          </h2>

          <div className="bg-black rounded-lg border border-gray-800 p-4">
            <ul className="space-y-2 list-disc list-inside">
              {question.constraints.split(",").map((constraint, index) => (
                <li key={index} className="text-gray-300">
                  <code className="bg-[#1A1A1A] px-2 py-1 rounded text-sm font-mono">
                    {constraint.trim()}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Topics Section */}
      {question.topics && (
        <div className="mt-6">
          <div className="bg-black rounded-lg border border-gray-800 overflow-hidden">
            <div
              onClick={() => setTopic(!topic)}
              className="flex justify-between items-center px-4 py-3 cursor-pointer bg-[#1A1A1A] border-b border-gray-800"
            >
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-purple-400" />
                <h2 className="font-semibold">Related Topics</h2>
              </div>
              {topic ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            <div
              ref={topicRef}
              className={`transition-all duration-300 ease-out overflow-hidden ${
                topic ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="p-4 flex flex-wrap gap-2">
                {getTopicsArray(question.topics).map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-purple-900/30 text-purple-400 rounded-full text-sm border border-purple-800/50"
                  >
                    {capitalize(topic)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hints Section */}
      {question.hints && question.hints.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb size={20} className="text-purple-400" />
            Hints
          </h2>

          <div className="space-y-3">
            {question.hints.map((hint, index) => (
              <div
                key={index}
                className="bg-black rounded-lg border border-gray-800 overflow-hidden"
              >
                <div
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center px-4 py-3 cursor-pointer bg-[#1A1A1A] border-b border-gray-800"
                >
                  <h3 className="font-medium">Hint {index + 1}</h3>
                  {isOpen[index] ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>

                <div
                  ref={contentRefs.current[index]}
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    isOpen[index] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-4 text-gray-300">{hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problem Link */}
      {question.slug && (
        <div className="mt-6 flex justify-end">
          <a
            href={`/problems/${question.slug}`}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View Problem</span>
            <ExternalLink size={16} />
          </a>
        </div>
      )}
    </div>
  );
}
