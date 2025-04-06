"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Star,
  Clock,
  CheckCircle,
  BookOpen,
  Code,
  ExternalLink,
  ChevronRight,
  BarChart,
} from "lucide-react";

export default function Page() {
  const [animateIn, setAnimateIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Algorithms and Data Structures for Beginners",
      image: "./images/image.png",
      progress: 65,
      difficulty: "Beginner",
      modules: 12,
    },
    {
      id: 2,
      title: "Advanced Dynamic Programming",
      image: "./images/image.png",
      progress: 30,
      difficulty: "Advanced",
      modules: 8,
    },
    {
      id: 3,
      title: "Graph Algorithms Masterclass",
      image: "./images/image.png",
      progress: 10,
      difficulty: "Intermediate",
      modules: 10,
    },
  ];

  // Sample sheet data
  const questionSheets = [
    {
      id: 1,
      title: "Array Manipulation Basics",
      difficulty: "Easy",
      status: "Completed",
      questions: 15,
      timeEstimate: "2 hours",
    },
    {
      id: 2,
      title: "String Algorithms",
      difficulty: "Medium",
      status: "In Progress",
      questions: 12,
      timeEstimate: "3 hours",
    },
    {
      id: 3,
      title: "Dynamic Programming I",
      difficulty: "Hard",
      status: "Not Started",
      questions: 10,
      timeEstimate: "4 hours",
    },
    {
      id: 4,
      title: "Binary Trees and BST",
      difficulty: "Medium",
      status: "Completed",
      questions: 8,
      timeEstimate: "2.5 hours",
    },
    {
      id: 5,
      title: "Greedy Algorithms",
      difficulty: "Medium",
      status: "Not Started",
      questions: 7,
      timeEstimate: "2 hours",
    },
    {
      id: 6,
      title: "Graph Traversal",
      difficulty: "Hard",
      status: "In Progress",
      questions: 9,
      timeEstimate: "3.5 hours",
    },
  ];

  // Filter options
  const filterOptions = [
    "All",
    "Easy",
    "Medium",
    "Hard",
    "Completed",
    "In Progress",
    "Not Started",
  ];

  // Filter sheets based on search and filter
  const filteredSheets = questionSheets.filter((sheet) => {
    const matchesSearch = sheet.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      sheet.difficulty === activeFilter ||
      sheet.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className={`flex-1 h-full flex flex-col gap-6 p-6 transition-all duration-500 ease-out ${
        animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Question Sheets</h1>
          <p className="text-gray-400 mt-1">
            Practice with curated problem sets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-[#2A2A2A] rounded-lg flex items-center gap-2 border border-gray-700">
            <BarChart size={16} className="text-blue-400" />
            <span className="text-sm font-medium">Your Progress: 42%</span>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <PracticeCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-2">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search question sheets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#2A2A2A] rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2A] rounded-lg border border-gray-700 w-full">
              <Filter size={18} />
              <span>Filter: {activeFilter}</span>
            </button>
            <div className="absolute top-full left-0 mt-2 w-full bg-[#2A2A2A] rounded-lg border border-gray-700 shadow-lg z-10 hidden group-hover:block">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#3A3A3A] ${
                    activeFilter === option ? "text-blue-400" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="relative group flex-1 md:flex-none">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2A] rounded-lg border border-gray-700 w-full">
              <ArrowUpDown size={18} />
              <span>Sort</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#2A2A2A] rounded-lg border border-gray-700 shadow-lg z-10 hidden group-hover:block">
              <div
                onClick={() => setSortOrder("name-asc")}
                className="px-4 py-2 cursor-pointer hover:bg-[#3A3A3A]"
              >
                Name (A-Z)
              </div>
              <div
                onClick={() => setSortOrder("name-desc")}
                className="px-4 py-2 cursor-pointer hover:bg-[#3A3A3A]"
              >
                Name (Z-A)
              </div>
              <div
                onClick={() => setSortOrder("difficulty-asc")}
                className="px-4 py-2 cursor-pointer hover:bg-[#3A3A3A]"
              >
                Difficulty (Easy-Hard)
              </div>
              <div
                onClick={() => setSortOrder("difficulty-desc")}
                className="px-4 py-2 cursor-pointer hover:bg-[#3A3A3A]"
              >
                Difficulty (Hard-Easy)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Sheets Table */}
      <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#2A2A2A]">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Sheet Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Difficulty
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Questions
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Est. Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSheets.map((sheet, index) => (
              <tr
                key={sheet.id}
                className={`border-t border-gray-800 ${
                  index % 2 === 0 ? "bg-[#1D1D1D]" : "bg-[#1A1A1A]"
                } hover:bg-[#2A2A2A] transition-colors`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-blue-400" />
                    <span>{sheet.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      sheet.difficulty === "Easy"
                        ? "bg-green-900/30 text-green-400"
                        : sheet.difficulty === "Medium"
                        ? "bg-yellow-900/30 text-yellow-400"
                        : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {sheet.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">{sheet.questions} problems</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span>{sheet.timeEstimate}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`flex items-center gap-1.5 ${
                      sheet.status === "Completed"
                        ? "text-green-400"
                        : sheet.status === "In Progress"
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    {sheet.status === "Completed" ? (
                      <CheckCircle size={14} />
                    ) : sheet.status === "In Progress" ? (
                      <Clock size={14} />
                    ) : (
                      <BookOpen size={14} />
                    )}
                    {sheet.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    {sheet.status === "Not Started" ? "Start" : "Continue"}
                    <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Custom Practice Course Card Component
function PracticeCourseCard({ course }) {
  return (
    <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1D1D1D] rounded-xl border border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-900/10 transition-all hover:border-gray-700 group">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-blue-900/20 flex-shrink-0">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg group-hover:text-blue-400 transition-colors">
              {course.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  course.difficulty === "Beginner"
                    ? "bg-green-900/30 text-green-400"
                    : course.difficulty === "Intermediate"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {course.difficulty}
              </span>
              <span className="text-xs text-gray-400">
                {course.modules} modules
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                course.difficulty === "Beginner"
                  ? "bg-green-500"
                  : course.difficulty === "Intermediate"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <button className="mt-4 w-full py-2 rounded-lg bg-[#2F3136] hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-600">
          <Code size={16} />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
}
