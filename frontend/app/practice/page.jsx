"use client";

import Navbar2 from "components/Others/Navbar2";
import PracticeComponent from "components/Practice/practice";
import { Menu } from "lucide-react";
import React, { useRef, useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState([false, false]);
  const contentRefs = [useRef(null), useRef(null)];

  const toggleCollapse = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Navbar2 />
      <div className="w-full h-full flex gap-4 items-start p-4">
        <div className="w-[300px] h-full p-4 bg-[#2A2A2A] flex flex-col rounded-lg">
          <div className="text-lg font-semibold mb-6 text-center">Menu</div>

          <div className="w-full overflow-hidden mb-4">
            <div
              onClick={() => toggleCollapse(0)} // Toggle for Sheets
              className="flex gap-2 items-center justify-center border border-gray-600 rounded-xl py-3 cursor-pointer"
            >
              <button className="focus:outline-none text-lg font-semibold">
                Sheets
              </button>
              <Menu />
            </div>

            <div
              ref={contentRefs[0]} // Use ref for Sheets
              className={`transition-[height] duration-500 ease-out overflow-hidden`}
              style={{
                height: isOpen[0] ? contentRefs[0].current.scrollHeight : 0,
              }}
            >
              <div className="flex flex-col items-center">
                <h1 className="py-2 active:text-red-400">AlgoNest 400</h1>
                <h1 className="py-2">AlgoNest 200</h1>
                <h1 className="py-2">AlgoNest 100</h1>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div
              onClick={() => toggleCollapse(1)} // Toggle for Quizzes
              className="flex gap-2 items-center justify-center border border-gray-600 rounded-xl py-3 cursor-pointer"
            >
              <button className="focus:outline-none text-lg font-semibold">
                Quizzes
              </button>
              <Menu />
            </div>

            <div
              ref={contentRefs[1]} // Use ref for Quizzes
              className={`transition-[height] duration-500 ease-out overflow-hidden`}
              style={{
                height: isOpen[1] ? contentRefs[1].current.scrollHeight : 0,
              }}
            >
              <div className="flex flex-col items-center">
                <h1 className="py-2 active:text-red-400">AlgoNest 400</h1>
                <h1 className="py-2">AlgoNest 200</h1>
                <h1 className="py-2">AlgoNest 100</h1>
              </div>
            </div>
          </div>
        </div>
        <PracticeComponent />
      </div>
    </div>
  );
}
