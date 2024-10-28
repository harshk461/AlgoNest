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
    <div
      className="relative inline-block text-left rounded-lg bg-secondary"
      ref={dropdownRef}
    >
      <div
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 gap-4"
      >
        <button className="text-lg font-medium text-txt_primary">
          {title}
        </button>

        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-fit origin-top-right bg-secondary rounded-md shadow-lg shadow-black">
          <ul className="p-2">
            {options.map((item, index) => (
              <li
                key={index}
                className={`px-6 py-2 text-lg font-normal bg-secondary cursor-pointer hover:bg-[#454444] rounded-lg
                  ${item == "Easy" && "text-green-500"}
                  ${item == "Medium" && "text-yellow-500"}
                  ${item == "Hard" && "text-red-500"}`}
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
