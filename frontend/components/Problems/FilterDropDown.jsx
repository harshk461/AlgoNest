"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Dropdown({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A24] border border-gray-800 rounded-lg cursor-pointer hover:bg-[#2A2A36] transition-colors"
      >
        <span className="text-gray-300 font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-fit min-w-full origin-top-right bg-[#1A1A24] rounded-lg border border-gray-800 shadow-lg overflow-hidden">
          <ul className="py-1">
            {options.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#2A2A36] transition-colors
                  ${item === "Easy" ? "text-green-400" : ""}
                  ${item === "Medium" ? "text-yellow-400" : ""}
                  ${item === "Hard" ? "text-red-400" : ""}
                  ${
                    !["Easy", "Medium", "Hard"].includes(item)
                      ? "text-gray-300"
                      : ""
                  }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
