"use client";

import { useState } from "react";

export default function ReleaseNotes() {
  const [visibleItems, setVisibleItems] = useState(3); // Number of initially visible items
  const [showLessVisible, setShowLessVisible] = useState(false); // Track if "Show Less" is active

  const allItems = [
    { date: "October 16 2024", description: "Lorem ipsum dolor sit amet." },
    { date: "October 15 2024", description: "Consectetur adipiscing elit." },
    {
      date: "October 14 2024",
      description: "Sed do eiusmod tempor incididunt.",
    },
    {
      date: "October 13 2024",
      description: "Ut labore et dolore magna aliqua.",
    },
    { date: "October 12 2024", description: "Quis autem vel eum iure." },
    {
      date: "October 11 2024",
      description: "Tempor incididunt ut labore et dolore.",
    },
  ];

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 3); // Increase visible items by 3
    setShowLessVisible(true); // Show the "Show Less" button
  };

  const handleShowLess = () => {
    setVisibleItems((prev) => Math.max(prev - 3, 3)); // Decrease visible items by 3, minimum 3
    if (visibleItems <= 6) {
      setShowLessVisible(false); // Hide the "Show Less" button if at minimum
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-[50px]">
      <div className="w-[1000px] max-w-full bg-[#2F3136] p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Release Notes</h1>
          <button className="px-4 py-2 rounded-lg bg-blue-600 font-semibold text-lg">
            Feature Request
          </button>
        </div>

        <ul className="list-disc list-inside mt-4">
          {allItems.slice(0, visibleItems).map((item, index) => (
            <li key={index} className="flex gap-2 text-lg mb-2">
              <span className="font-semibold">{item.date} -</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>

        <div className="w-full flex justify-center">
          {/* Show More Button */}
          {visibleItems < allItems.length && (
            <button
              className="text-blue-300 underline font-semibold text-lg"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}

          {/* Show Less Button */}
          {showLessVisible && (
            <button
              className="text-blue-300 underline font-semibold text-lg"
              onClick={handleShowLess}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
