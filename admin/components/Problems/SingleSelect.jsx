"use client";
import React from "react";

export default function SingleSelect({
  value,
  setValue,
  options,
  placeholder,
  className,
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`bg-background rounded-lg py-3 px-4 w-full text-sm focus:outline-none
      ${className}`}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option
          key={index}
          value={option}
          className="text-gray-800 hover:bg-gray-100"
        >
          {option}
        </option>
      ))}
    </select>
  );
}
