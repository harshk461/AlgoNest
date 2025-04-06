"use client";

import React from "react";

import { courses } from "../data/Data";
import ReleaseNotes from "../components/Home/ReleaseNotes";
import Footer from "../components/Others/Footer";
import Courses from "../components/Home/Courses";
import CourseBox from "@/components/Home/CourseBox";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full h-screen lg:px-[100px] p-6 flex justify-between items-center">
        {/* Decorative elements */}{" "}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob"></div>{" "}
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob animation-delay-2000"></div>{" "}
        <div className="flex flex-col gap-8 max-w-2xl relative z-10">
          {" "}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-950/30 rounded-full mb-2 border border-indigo-800/40 w-fit">
            {" "}
            <span className="text-indigo-400 text-sm font-medium">
              Master Algorithms
            </span>{" "}
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            AlgoNest
          </h1>
          <h2 className="text-3xl font-semibold text-gray-300">
            A better way to prepare for{" "}
            <span className="text-indigo-400">coding interviews</span>.
          </h2>
          <p className="text-gray-400 text-lg max-w-lg">
            Structured learning paths, interactive challenges, and real-time
            feedback to help you excel in technical interviews.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="relative overflow-hidden px-10 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-900/20 group">
              <span className="relative z-10 flex items-center gap-2">
                Get Premium
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>

            <button className="px-10 py-4 rounded-full text-xl font-bold border-2 border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-indigo-400 transition-all">
              Try Free
            </button>
          </div>
          <div className="flex items-center gap-6 mt-6">
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-10 h-10 rounded-full border-2 border-gray-900"
              />
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-10 h-10 rounded-full border-2 border-gray-900"
              />
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                className="w-10 h-10 rounded-full border-2 border-gray-900"
              />
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold border-2 border-gray-900">
                +5k
              </div>
            </div>
            <p className="text-gray-400">
              Joined by <span className="text-white font-medium">5,000+</span>{" "}
              developers
            </p>
          </div>
        </div>
        {/* Right side illustration or code snippet */}
        <div className="hidden lg:block w-[500px] h-[500px] relative">
          {" "}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>{" "}
          <div className="absolute inset-0 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {" "}
            <div className="bg-gray-900/80 p-4 border-b border-gray-800 flex items-center gap-2">
              {" "}
              <div className="w-3 h-3 rounded-full bg-red-500"></div>{" "}
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>{" "}
              <div className="w-3 h-3 rounded-full bg-green-500"></div>{" "}
              <span className="ml-2 text-gray-400 text-sm">algorithm.js</span>{" "}
            </div>{" "}
            <pre className="p-6 text-sm text-gray-300 font-mono">
              {" "}
              <code>
                {" "}
                {`function twoSum(nums, target) { const map = new Map();
for (let i = 0; i < nums.length; i++) {
const complement = target - nums[i];

text
if (map.has(complement)) {
  return [map.get(complement), i];
}

map.set(nums[i], i);
}

return [];
}`}
              </code>
            </pre>
          </div>
        </div>{" "}
      </div>
      <ReleaseNotes />
      <div className="w-full flex flex-col items-center py-[100px]">
        <h1 className="text-6xl font-bold">Courses</h1>
        {courses &&
          courses.map((item, index) => (
            <Courses
              key={index}
              course={item.course}
              course_description={item.course_description}
              courses={item.courses}
            />
          ))}
      </div>
    </div>
  );
}
