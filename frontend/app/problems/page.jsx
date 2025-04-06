"use client";

import axios from "axios";
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
  Code,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Zap,
  Shield,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useBase from "@/hooks/useBase";
import FilterDropDown from "/components/Problems/FilterDropDown";
import QuestionTable from "/components/Problems/QuestionTable";
import StudyPlanBox from "/components/Problems/StudyPlanBox";

export default function Page() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [error, setError] = useState(null);

  const url = useBase();

  useEffect(() => {
    setAnimateIn(true);
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/problems/all-problems`);
      setQuestions(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError("Failed to load problems. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-10 transition-all duration-700 ease-out ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header with animated gradient */}
        <header className="relative mb-12 overflow-hidden rounded-2xl bg-[#000] border border-gray-800 p-8">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-900/40 flex items-center justify-center">
                <Code size={24} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Problem Explorer
                </h1>
                <p className="text-gray-400 mt-1">
                  Discover, filter, and solve algorithmic challenges to enhance
                  your coding skills
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <StatBadge
                icon={<CheckCircle size={14} />}
                color="emerald"
                label="243 Problems Solved"
              />
              <StatBadge
                icon={<Star size={14} />}
                color="amber"
                label="Rank: 15,432"
              />
              <StatBadge
                icon={<Clock size={14} />}
                color="blue"
                label="Last Solved: 2h ago"
              />
              <StatBadge
                icon={<Zap size={14} />}
                color="purple"
                label="Current Streak: 7 days"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Study Plans Section */}
            <StudyPlansSection />

            {/* Problems Section */}
            <ProblemsSection
              loading={loading}
              questions={questions}
              error={error}
              onRetry={fetchProblems}
            />
          </div>

          {/* Stats Section (1/3 width) */}
          <div className="lg:col-span-1">
            <StatsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Badge Component
function StatBadge({ icon, color, label }) {
  const colorMap = {
    emerald: "bg-emerald-900/30 text-emerald-400 border-emerald-800/50",
    amber: "bg-amber-900/30 text-amber-400 border-amber-800/50",
    blue: "bg-blue-900/30 text-blue-400 border-blue-800/50",
    purple: "bg-purple-900/30 text-purple-400 border-purple-800/50",
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colorMap[color]}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// Study Plans Section Component
function StudyPlansSection() {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-900/40 flex items-center justify-center">
            <BookOpen size={20} className="text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold">Study Courses</h2>
        </div>
        <button className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg text-indigo-400 text-sm font-medium flex items-center gap-2 transition-colors border border-indigo-800/30">
          See All Courses
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StudyPlanBox />
        <StudyPlanBox />
        <StudyPlanBox />
      </div>
    </section>
  );
}

// Problems Section Component
function ProblemsSection({ loading, questions, error, onRetry }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-900/40 flex items-center justify-center">
            <BarChart2 size={20} className="text-purple-400" />
          </div>
          <h2 className="text-xl font-bold">Problems</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-900/20 cursor-pointer hover:shadow-lg transition-shadow">
            <Shuffle size={18} className="text-white" />
          </div>
          <span className="font-medium text-emerald-400">Random</span>
        </div>
      </div>

      <div className="bg-[#16161D] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <FilterControls />
        </div>

        <div className="p-4">
          {error ? (
            <ErrorState message={error} onRetry={onRetry} />
          ) : loading ? (
            <LoadingState />
          ) : questions && questions.length > 0 ? (
            <QuestionTable questions={questions} />
          ) : (
            <EmptyState />
          )}
        </div>

        <div className="p-4 border-t border-gray-800">
          <PaginationControls />
        </div>
      </div>
    </section>
  );
}

// Filter Controls Component
function FilterControls() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-2 flex-wrap">
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

// Error State Component
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
        <AlertTriangle size={32} className="text-red-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
      <p className="text-gray-400 mb-6 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
        <Search size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No problems found</h3>
      <p className="text-gray-400 max-w-md">
        Try adjusting your filters or search criteria to find problems.
      </p>
    </div>
  );
}

// Pagination Controls Component
function PaginationControls() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              num === 1
                ? "bg-indigo-600 text-white"
                : "bg-[#1D1D26] hover:bg-[#25252F]"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
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
    <div className="sticky top-8">
      <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-900/40 flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold">Your Progress</h2>
          </div>

          {/* Progress Circle */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-28 h-28">
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
                  stroke="url(#progress-gradient)"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * totalPercent) / 100}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient
                    id="progress-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold">{totalPercent}%</span>
                <span className="text-xs text-gray-400">Solved</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Problems Solved</span>
                <span className="font-medium">
                  {stats.solved}/{stats.total}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full mb-4">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
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
          <div className="space-y-4">
            <h3 className="font-medium text-gray-300 mb-2">
              Difficulty Breakdown
            </h3>
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
        <div className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            Recent Activity
          </h3>
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

          <button className="w-full mt-4 py-2 bg-[#1D1D26] hover:bg-[#25252F] rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
            View All Activity
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Difficulty Bar Component
function DifficultyBar({ label, color, solved, total, percent }) {
  const colorMap = {
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-500",
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-500",
    },
    rose: {
      text: "text-rose-400",
      bg: "bg-rose-500",
    },
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={colorMap[color].text}>{label}</span>
        <span className="text-gray-400">
          {solved}/{total}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full">
        <div
          className={`h-full ${colorMap[color].bg} rounded-full`}
          style={{ width: `${percent}%` }}
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
