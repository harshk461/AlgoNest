import React from "react";
import { BookOpen, Star, Users, ArrowRight } from "lucide-react";

export default function StudyPlanBox() {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-[#1D1D26] to-[#16161D] border border-gray-800 hover:border-indigo-800/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-900/10">
      {/* Hover effect gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex p-4 gap-4 relative z-10">
        {/* Image container with fixed dimensions */}
        <div className="relative flex-shrink-0 w-[80px] h-[80px]">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300"></div>
          <img
            src="./images/image.png"
            alt="Study Plan"
            className="h-full w-full rounded-lg object-cover border border-gray-700 group-hover:border-indigo-700/50 transition-all duration-300"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute -top-2 -right-2 bg-indigo-600 text-xs font-bold px-1.5 py-0.5 rounded shadow-md">
            TOP
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-center min-w-0">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-indigo-400 transition-colors duration-300 truncate">
            Top Interview 150
          </h3>

          <p className="text-gray-400 text-sm mb-2 line-clamp-1">
            Must-do List for Interview Prep
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen size={12} />
              <span>150 problems</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>25k+ users</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400" />
              <span className="text-amber-400">4.8</span>
            </div>
          </div>
        </div>

        {/* Arrow icon that appears on hover */}
        <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
          <ArrowRight size={18} className="text-indigo-400" />
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-800">
        <div className="h-full bg-indigo-600 w-[35%]"></div>
      </div>
    </div>
  );
}
