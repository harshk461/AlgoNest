"use client";

import { getProblem } from "@/app/functions/problem";
import { capitalize } from "@/app/functions/Utils";
import { ChevronDown, ChevronUp, Lightbulb, Tag } from "lucide-react";
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

  const fetchQuestion = async () => {
    try {
      const res = await getProblem(problem);
      setQuestion(res);
      setIsOpen(Array(res.hints?.length || 0).fill(false));
      contentRefs.current = Array(res.hints?.length || 0)
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

  if (loading) {
    return (
      <div className="w-full flex p-4 flex-col gap-4">
        <div className="w-full p-[30px] rounded-xl animate-pulse bg-primary"></div>
        <div className="w-full h-[80px] rounded-xl animate-pulse bg-primary"></div>
        <div className="w-full p-[100px] rounded-xl animate-pulse bg-primary"></div>
      </div>
    );
  }

  // const t = "harsh <b>kumar</b> ksd";

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* <h1 dangerouslySetInnerHTML={{ __html: t }} /> */}
      <h1 className="text-lg font-semibold">{question.question}</h1>
      <h1
        className={`font-bold
          ${question.difficulty === "medium" && "text-yellow-400"}
          ${question.difficulty === "easy" && "text-green-400"}
          ${question.difficulty === "hard" && "text-red-500"}`}
      >
        {capitalize(question.difficulty)}
      </h1>
      <div className="w-full text-[17px] font-[400] flex flex-col gap-3">
        {question.description &&
          question.description.map((item, index) => (
            <h1 dangerouslySetInnerHTML={{ __html: item }} key={index} />
          ))}
      </div>

      {/* Given Testcases */}
      <div className="w-full flex flex-col gap-8 mt-8">
        {question.testcases &&
          question.testcases.map((item, index) => (
            <div key={index} className="w-full flex flex-col gap-4">
              <h1 className="text-md font-semibold">Example {index + 1}:</h1>
              <div className="w-full pl-3 flex flex-col gap-4 border-l-2 border-l-[#555454]">
                <div className="flex gap-3">
                  <h1 className="font-bold text-white">Input:</h1>
                  <h1>{item.input}</h1>
                </div>
                <div className="flex gap-3">
                  <h1 className="font-bold text-white">Output:</h1>
                  <h1>{item.output}</h1>
                </div>
                {item.explaination && (
                  <div className="flex gap-3">
                    <h1 className="font-bold text-white">Explanation:</h1>
                    <h1>{item.explaination}</h1>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Constraints */}
      {question.constraints && (
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-lg font-semibold">Constraints:</h1>
          <ul className="list-disc list-inside ml-4 space-y-4">
            {question.constraints.map((item, index) => (
              <li key={index}>
                <h1 className="bg-[#353535] text-[#c9c9c9] inline-block px-3 rounded-lg">
                  {item}
                </h1>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Topics */}
      {question.topics && (
        <div className="w-full overflow-hidden border-b-4 border-[#353535] cursor-pointer">
          <div
            onClick={() => setTopic(!topic)}
            className="w-full px-4 py-3 flex justify-between items-center"
          >
            <div className="flex gap-4 items-center text-[#c9c9c9]">
              <Tag />
              <h1 className="text-md font-semibold">Topics</h1>
            </div>
            <div>
              {topic ? (
                <ChevronUp color="#c9c9c9" />
              ) : (
                <ChevronDown color="#c9c9c9" />
              )}
            </div>
          </div>

          <div
            ref={topicRef}
            className={`transition-[height] duration-500 ease-out overflow-hidden`}
            style={{
              height: topic ? topicRef.current.scrollHeight : 0,
            }}
          >
            <div className="flex flex-wrap gap-4 px-4 py-3">
              {question.topics.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-1 rounded-full text-[15px] bg-[#353535]"
                >
                  {capitalize(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hints */}
      {question.hints && question.hints.length > 0 && (
        <div className="flex flex-col gap-4">
          {question.hints.map((item, index) => (
            <div
              key={index}
              className="w-full overflow-hidden border-b-4 border-b-[#353535]"
            >
              <div
                onClick={() => toggleCollapse(index)}
                className="flex py-3 cursor-pointer justify-between px-4"
              >
                <div className="flex gap-4 items-center text-[#c9c9c9]">
                  <Lightbulb />
                  <h1 className="text-md font-semibold">Hint {index + 1}</h1>
                </div>
                <div>
                  {isOpen[index] ? (
                    <ChevronUp color="#c9c9c9" />
                  ) : (
                    <ChevronDown color="#c9c9c9" />
                  )}
                </div>
              </div>
              <div
                ref={contentRefs.current[index]}
                className={`transition-[height] duration-500 ease-out overflow-hidden`}
                style={{
                  height: isOpen[index]
                    ? contentRefs.current[index]?.current.scrollHeight
                    : 0,
                }}
              >
                <div className="flex flex-col items-center text-md">
                  <h1 className="px-4 py-2">{item}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
