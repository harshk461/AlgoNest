import React from "react";
import { Code, ThumbsUp, MessageSquare, Bookmark } from "lucide-react";

export default function SolutionBox() {
  const topics = ["Dynamic Programming", "Arrays", "Sets"];

  return (
    <div className="w-full bg-black rounded-xl border border-gray-800 p-4 hover:border-purple-800/50 transition-all duration-300">
      <div className="flex gap-4 items-start">
        {/* User Avatar */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline flex-shrink-0 relative group"
          href="/u/anwendeng/"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity"></div>
          <img
            src="https://assets.leetcode.com/users/avatars/avatar_1675348402.png"
            alt="User avatar"
            className="relative rounded-full object-cover h-10 w-10 border-2 border-transparent group-hover:border-purple-500 transition-all"
          />
        </a>

        {/* Solution Content */}
        <div className="w-full flex flex-col items-start">
          <div className="flex justify-between w-full mb-2">
            <h1 className="text-sm text-gray-400 font-medium">Username</h1>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>

          <h1 className="text-xl font-bold mb-3 text-white hover:text-purple-400 transition-colors cursor-pointer">
            Solution Title
          </h1>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 items-center mb-4">
            {topics.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1 text-xs font-medium bg-purple-900/30 text-purple-400 rounded-full border border-purple-800/50"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-4 text-gray-400 text-sm mt-2">
            <div className="flex items-center gap-1 hover:text-purple-400 transition-colors cursor-pointer">
              <ThumbsUp size={16} />
              <span>24</span>
            </div>
            <div className="flex items-center gap-1 hover:text-purple-400 transition-colors cursor-pointer">
              <MessageSquare size={16} />
              <span>5</span>
            </div>
            <div className="flex items-center gap-1 hover:text-purple-400 transition-colors cursor-pointer">
              <Code size={16} />
              <span>View Solution</span>
            </div>
            <div className="ml-auto hover:text-purple-400 transition-colors cursor-pointer">
              <Bookmark size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
