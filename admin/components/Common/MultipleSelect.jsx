// components/MultiSelect.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

export default function MultiSelect({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValues);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    let newSelected;

    if (selected.includes(value)) {
      newSelected = selected.filter((item) => item !== value);
    } else {
      newSelected = [...selected, value];
    }

    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  const removeOption = (e, value) => {
    e.stopPropagation();
    const newSelected = selected.filter((item) => item !== value);
    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  // Get selected option labels
  const selectedLabels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => option.label);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Selected items display */}
      <div
        className={`flex items-center flex-wrap min-h-10 px-4 py-3 rounded-md cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span style={{ color: "var(--primary)" }}>{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedLabels.map((label, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-2 py-1 text-sm rounded-md"
                style={{
                  backgroundColor: "var(--secondary)",
                }}
              >
                {label}
                <X
                  size={14}
                  className="cursor-pointer hover:opacity-70"
                  onClick={(e) =>
                    removeOption(
                      e,
                      options.find((opt) => opt.label === label).value
                    )
                  }
                />
              </span>
            ))}
          </div>
        )}
        <div className="ml-auto">
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full border border-opacity-20 border-current rounded-md shadow-lg max-h-60 overflow-auto"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                flex items-center justify-between px-4 py-2 cursor-pointer hover:opacity-80
                ${selected.includes(option.value) ? "opacity-90" : ""}
              `}
              style={{
                backgroundColor: selected.includes(option.value)
                  ? "var(--secondary)"
                  : "var(--background)",
                color: selected.includes(option.value)
                  ? "var(--background)"
                  : "var(--foreground)",
              }}
              onClick={() => toggleOption(option.value)}
            >
              <span>{option.label}</span>
              {selected.includes(option.value) && <Check size={16} />}
            </div>
          ))}
          {options.length === 0 && (
            <div className="px-4 py-2 opacity-70">No options available</div>
          )}
        </div>
      )}
    </div>
  );
}
