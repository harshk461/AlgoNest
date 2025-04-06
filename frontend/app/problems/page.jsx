"use client";

import FilterDropDown from "/components/Problems/FilterDropDown";
import QuestionTable from "/components/Problems/QuestionTable";
import StudyPlanBox from "/components/Problems/StudyPlanBox";
import {
  Search,
  Settings,
  Shuffle,
  TrendingUp,
  Award,
  BookOpen,
  BarChart2,
  Filter,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllProblems } from "../functions/problem";

export default function Page() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);

    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getAllProblems();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0F0F13] text-gray-200">
      <div
        className={`max-w-7xl mx-auto px-4 py-8 transition-all duration-700 ease-out ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Problem Explorer
          </h1>
          <p className="text-gray-400">
            Discover, filter, and solve algorithmic challenges to enhance your
            coding skills
          </p>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Study Plans Section */}
            <StudyPlansSection />

            {/* Problems Section */}
            <ProblemsSection loading={loading} questions={questions} />
          </div>

          {/* Stats Section */}
          <StatsSection />
        </div>
      </div>
    </div>
  );
}

// Study Plans Section Component
function StudyPlansSection() {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-900/40 flex items-center justify-center">
            <BookOpen size={18} className="text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold">Study Courses</h2>
        </div>
        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
          See More
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StudyPlanBox />
        <StudyPlanBox />
        <StudyPlanBox />
        <StudyPlanBox />
        <StudyPlanBox />
        <StudyPlanBox />
      </div>
    </section>
  );
}

// Problems Section Component
function ProblemsSection({ loading, questions }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-900/40 flex items-center justify-center">
          <BarChart2 size={18} className="text-purple-400" />
        </div>
        <h2 className="text-lg font-semibold">Problems</h2>
      </div>
      <div className="bg-[#16161D] rounded-xl border border-gray-800 p-4 mb-6">
        <FilterControls />

        {loading ? <LoadingState /> : <QuestionTable questions={questions} />}

        <PaginationControls />
      </div>
    </section>
  );
}

// Filter Controls Component
function FilterControls() {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <div className="flex gap-2">
        <FilterDropDown
          title={"Lists"}
          options={["Favorites", "AlgoNest 300", "AlgoNest 200"]}
        />
        <FilterDropDown
          title={"Difficulty"}
          options={["Easy", "Medium", "Hard"]}
        />
        <FilterDropDown
          title={"Status"}
          options={["Todo", "Solved", "Attempted"]}
        />
      </div>
      <div className="flex-1 min-w-[200px] relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full py-2.5 pl-10 pr-4 bg-[#1D1D26] border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
      <button className="p-2.5 bg-[#1D1D26] border border-gray-800 rounded-lg hover:bg-[#25252F] transition-colors">
        <Settings size={18} className="text-gray-400" />
      </button>
      <div className="flex items-center gap-2 ml-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-900/20">
          <Shuffle size={16} className="text-white" />
        </div>
        <span className="font-medium text-emerald-400">Pick Random</span>
      </div>
    </div>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className="w-full flex p-4 flex-col gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="w-full h-[50px] rounded-lg animate-pulse bg-[#1D1D26]"
        ></div>
      ))}
    </div>
  );
}

// Pagination Controls Component
function PaginationControls() {
  return (
    <div className="w-full flex justify-between items-center mt-4">
      <FilterDropDown
        title={"50 / page"}
        options={["50 / page", "25 / page", "10 / page"]}
      />

      {/* <div className="flex gap-1">
    {.map(num => (
      <button 
        key={num} 
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
          num === 1 
            ? 'bg-indigo-600 text-white' 
            : 'bg-[#1D1D26] hover:bg-[#25252F]'
        }`}
      >
        {num}
      </button>
    ))}
  </div> */}
    </div>
  );
}

// Stats Section Component
function StatsSection() {
  const stats = {
    total: 600,
    solved: 243,
    easy: { total: 200, solved: 120 },
    medium: { total: 300, solved: 98 },
    hard: { total: 100, solved: 25 },
  };

  // Calculate percentages
  const easyPercent = Math.round((stats.easy.solved / stats.easy.total) * 100);
  const mediumPercent = Math.round(
    (stats.medium.solved / stats.medium.total) * 100
  );
  const hardPercent = Math.round((stats.hard.solved / stats.hard.total) * 100);
  const totalPercent = Math.round((stats.solved / stats.total) * 100);

  return (
    <div className="w-full lg:w-[350px] flex-shrink-0">
      <div className="sticky top-8">
        <div className="bg-[#16161D] rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-900/40 flex items-center justify-center">
                <TrendingUp size={18} className="text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold">Your Progress</h2>
            </div>
            {/* Progress Circle */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#2D2D3A"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * totalPercent) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold">{totalPercent}%</span>
                  <span className="text-xs text-gray-400">Solved</span>
                </div>
              </div>

              <div className="flex-1 pl-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Solved</span>
                  <span className="font-medium">
                    {stats.solved}/{stats.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full mb-4">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${totalPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center gap-2">
                  <Award size={16} className="text-yellow-400" />
                  <span className="text-sm font-medium">Rank: 15,432</span>
                </div>
              </div>
            </div>
            {/* Difficulty Breakdown */}
            <div className="space-y-3">
              <DifficultyBar
                label="Easy"
                color="emerald"
                solved={stats.easy.solved}
                total={stats.easy.total}
                percent={easyPercent}
              />
              <DifficultyBar
                label="Medium"
                color="amber"
                solved={stats.medium.solved}
                total={stats.medium.total}
                percent={mediumPercent}
              />
              <DifficultyBar
                label="Hard"
                color="rose"
                solved={stats.hard.solved}
                total={stats.hard.total}
                percent={hardPercent}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-5">
            <h3 className="font-medium mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <ActivityItem
                title="Two Sum"
                difficulty="Easy"
                time="2 hours ago"
                status="solved"
              />
              <ActivityItem
                title="Merge Intervals"
                difficulty="Medium"
                time="Yesterday"
                status="attempted"
              />
              <ActivityItem
                title="LRU Cache"
                difficulty="Hard"
                time="3 days ago"
                status="solved"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Difficulty Bar Component
function DifficultyBar({ label, color, solved, total, percent }) {
  const colorMap = {
    emerald: "bg-emerald-500 text-emerald-400",
    amber: "bg-amber-500 text-amber-400",
    rose: "bg-rose-500 text-rose-400",
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={`${colorMap[color].split(" ")}`}>{label}</span>
        <span className="text-gray-400">
          {solved}/{total}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full">
        <div
          className={`h-full ${colorMap[color].split(" ")} rounded-full}
style={{ width: ${percent}% }`}
        ></div>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ title, difficulty, time, status }) {
  const difficultyColor = {
    Easy: "text-emerald-400",
    Medium: "text-amber-400",
    Hard: "text-rose-400",
  };

  const statusIcon = {
    solved: <div className="w-2 h-2 rounded-full bg-emerald-400"></div>,
    attempted: <div className="w-2 h-2 rounded-full bg-amber-400"></div>,
    failed: <div className="w-2 h-2 rounded-full bg-rose-400"></div>,
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1D1D26] transition-colors">
      {statusIcon[status]}
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2 text-xs">
          <span className={difficultyColor[difficulty]}>{difficulty}</span>
          <span className="text-gray-500">{time}</span>
        </div>
      </div>
    </div>
  );
}
