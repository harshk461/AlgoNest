"use client";

import Navbar2 from "components/Others/Navbar2";
import { ChevronDown, ChevronRight, BookOpen, HelpCircle } from "lucide-react";
import React, { useLayoutEffect, useRef, useState } from "react";

export default function Page({children}) {
const [isOpen, setIsOpen] = useState([false, false]);
  const contentRefs = [useRef(null), useRef(null)];

  const toggleCollapse = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useLayoutEffect(() => {
    contentRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.maxHeight = isOpen[index] ? `${ref.current.scrollHeight}px` : "0px";
      }
    });
  }, [isOpen]);

return (
<div className="w-full min-h-screen bg-black text-white">
    <Navbar2 />
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
    {/* Sidebar */}
    <div className="w-full md:w-[280px] shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
    <div className="p-4 border-b border-zinc-800">
    <h2 className="text-xl font-bold text-center">
    Learning Path
    </h2>
    </div>

          {/* Sheets Section */}
          <div className="w-full">
      <div
        onClick={() => toggleCollapse(0)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-blue-500" />
          <span className="font-medium">Sheets</span>
        </div>
        {isOpen[0] ? (
          <ChevronDown size={18} className="text-zinc-400" />
        ) : (
          <ChevronRight size={18} className="text-zinc-400" />
        )}
      </div>

      <div
        ref={contentRefs[0]}
        className="transition-all duration-300 ease-in-out overflow-hidden bg-zinc-900/50"
        style={{
          maxHeight: isOpen[0] ? (contentRefs[0]?.current?.scrollHeight || 0) + 'px' : "0px",
        }}
      >
        {["AlgoNest 400", "AlgoNest 200", "AlgoNest 100"].map((item, i) => (
          <div 
            key={i}
            className="py-2 px-12 hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-300 hover:text-blue-400"
          >
            {item}
          </div>
        ))}
      </div>
    </div>

      {/* Quizzes Section */}
      <div className="w-full">
  <div
    onClick={() => toggleCollapse(1)}
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800 transition-colors"
  >
    <div className="flex items-center gap-3">
      <BookOpen size={18} className="text-blue-500" />
      <span className="font-medium">Sheets</span>
    </div>
    {isOpen[1] ? (
      <ChevronDown size={18} className="text-zinc-400" />
    ) : (
      <ChevronRight size={18} className="text-zinc-400" />
    )}
  </div>

  <div
    ref={contentRefs[1]}
    className="transition-all duration-300 ease-in-out overflow-hidden bg-zinc-900/50"
    style={{
      maxHeight: isOpen[1] ? (contentRefs[1]?.current?.scrollHeight || 0) + 'px' : "0px",
    }}
  >
    {["AlgoNest 400", "AlgoNest 200", "AlgoNest 100"].map((item, i) => (
      <div 
        key={i}
        className="py-2 px-12 hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-300 hover:text-blue-400"
      >
        {item}
      </div>
    ))}
  </div>
</div>

      
      {/* Additional menu items could go here */}
      <div className="p-4 mt-4 border-t border-zinc-800">
        <div className="text-xs text-zinc-500 text-center">
          © 2025 AlgoNest
        </div>
      </div>
    </div>
    
    {/* Main Content */}
    <div className="w-full">
      {children}
    </div>
  </div>
</div>
);
}