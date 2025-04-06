"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Star,
  ArrowDown,
  ArrowUp,
  Sparkles,
  MessageSquarePlus,
  ChevronRight,
  Zap,
  Shield,
  Code,
  Database,
} from "lucide-react";

export default function ReleaseNotes() {
  const [visibleItems, setVisibleItems] = useState(3);
  const [showLessVisible, setShowLessVisible] = useState(false);

  // Actual release notes data with meaningful updates
  const allItems = [
    {
      date: "April 5, 2025",
      version: "v3.2.0",
      type: "feature",
      description:
        "Introduced AI-powered code suggestions to help you write cleaner and more efficient algorithms.",
      details: [
        "Smart code completion based on your coding patterns",
        "Real-time error detection and suggestions",
        "Performance optimization recommendations",
      ],
    },
    {
      date: "March 28, 2025",
      version: "v3.1.5",
      type: "improvement",
      description:
        "Enhanced the problem difficulty rating system with community-based metrics for more accurate assessments.",
      details: [
        "Dynamic difficulty adjustments based on solve rates",
        "Personalized difficulty indicators based on your skill level",
        "More granular difficulty categories",
      ],
    },
    {
      date: "March 20, 2025",
      version: "v3.1.4",
      type: "bugfix",
      description:
        "Fixed issues with code execution in Python and JavaScript runtime environments.",
      details: [
        "Resolved memory leak in Python interpreter",
        "Fixed timeout handling in JavaScript execution",
        "Improved error reporting for failed test cases",
      ],
    },
    {
      date: "March 15, 2025",
      version: "v3.1.3",
      type: "feature",
      description:
        "Added new collaborative problem-solving mode for team practice and interviews.",
      details: [
        "Real-time code sharing and editing",
        "Voice and video communication",
        "Interviewer tools for evaluation",
      ],
    },
    {
      date: "March 8, 2025",
      version: "v3.1.2",
      type: "improvement",
      description:
        "Redesigned the contest platform with improved leaderboards and analytics.",
      details: [
        "Live performance metrics during contests",
        "Enhanced post-contest analysis tools",
        "Global and regional ranking systems",
      ],
    },
    {
      date: "March 1, 2025",
      version: "v3.1.1",
      type: "feature",
      description:
        "Launched specialized learning tracks for system design and distributed algorithms.",
      details: [
        "Interactive system design scenarios",
        "Scalability challenges with real-world constraints",
        "Performance evaluation metrics",
      ],
    },
  ];

  const handleShowMore = () => {
    setVisibleItems((prev) => Math.min(prev + 3, allItems.length));
    setShowLessVisible(true);
  };

  const handleShowLess = () => {
    setVisibleItems((prev) => Math.max(prev - 3, 3));
    if (visibleItems <= 6) {
      setShowLessVisible(false);
    }
  };

  // Get icon based on update type
  const getTypeIcon = (type) => {
    switch (type) {
      case "feature":
        return <Sparkles size={18} className="text-indigo-400" />;
      case "improvement":
        return <Zap size={18} className="text-green-400" />;
      case "bugfix":
        return <Shield size={18} className="text-amber-400" />;
      default:
        return <Star size={18} className="text-blue-400" />;
    }
  };

  // Get color based on update type
  const getTypeColor = (type) => {
    switch (type) {
      case "feature":
        return "bg-indigo-900/30 text-indigo-400 border-indigo-800/50";
      case "improvement":
        return "bg-green-900/30 text-green-400 border-green-800/50";
      case "bugfix":
        return "bg-amber-900/30 text-amber-400 border-amber-800/50";
      default:
        return "bg-blue-900/30 text-blue-400 border-blue-800/50";
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="w-[1000px] max-w-full bg-gradient-to-br from-[#1D1D26] to-[#16161D] border border-gray-800 p-8 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-900/40 flex items-center justify-center">
                <Code size={18} className="text-indigo-400" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Release Notes
              </h1>
            </div>
            <p className="text-gray-400">
              Stay updated with our latest features, improvements, and fixes
            </p>
          </div>
          text
          <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-indigo-900/20">
            <MessageSquarePlus size={18} />
            <span>Feature Request</span>
          </button>
        </div>

        {/* Release Notes List */}
        <div className="space-y-6 mb-8">
          {allItems.slice(0, visibleItems).map((item, index) => (
            <ReleaseNoteItem
              key={index}
              item={item}
              getTypeIcon={getTypeIcon}
              getTypeColor={getTypeColor}
            />
          ))}
        </div>

        {/* Show More/Less Controls */}
        <div className="w-full flex justify-center gap-4">
          {visibleItems < allItems.length && (
            <button
              className="px-4 py-2 bg-[#2A2A36] hover:bg-[#32323E] rounded-lg font-medium flex items-center gap-2 transition-colors"
              onClick={handleShowMore}
            >
              <ArrowDown size={16} />
              <span>Show More</span>
            </button>
          )}

          {showLessVisible && (
            <button
              className="px-4 py-2 bg-[#2A2A36] hover:bg-[#32323E] rounded-lg font-medium flex items-center gap-2 transition-colors"
              onClick={handleShowLess}
            >
              <ArrowUp size={16} />
              <span>Show Less</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Release Note Item Component
function ReleaseNoteItem({ item, getTypeIcon, getTypeColor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-5 rounded-xl bg-[#1A1A24] border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex items-start gap-4">
        {/* Date Column */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-[#2A2A36] flex items-center justify-center mb-2">
            <Calendar size={20} className="text-gray-400" />
          </div>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {item.date}
          </span>
        </div>
        text
        {/* Content Column */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-semibold text-lg">{item.version}</span>
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                item.type
              )} flex items-center gap-1.5`}
            >
              {getTypeIcon(item.type)}
              <span>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Clock size={14} />
              <span>
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <p className="text-gray-300 mb-3">{item.description}</p>

          {/* Expandable Details */}
          {item.details && (
            <>
              <div
                className={`space-y-2 pl-4 border-l-2 border-gray-800 mb-3 ${
                  expanded ? "block" : "hidden"
                }`}
              >
                {item.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                {expanded ? "Show less" : "Show details"}
                {expanded ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
