"use client";

import { ChevronDown, ChevronRight, BookOpen, HelpCircle } from "lucide-react";
import React, { useLayoutEffect, useRef, useState } from "react";

export default function Page({ children }) {
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
        ref.current.style.maxHeight = isOpen[index]
          ? `${ref.current.scrollHeight}px`
          : "0px";
      }
    });
  }, [isOpen]);

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
