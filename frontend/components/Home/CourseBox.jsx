import React from "react";
import { Clock, BarChart2, ChevronRight, Star } from "lucide-react";

export default function CourseBox({ course, course_description }) {
  // Function to determine difficulty color
  const getDifficultyColor = (difficulty = "Medium") => {
    const colors = {
      Easy: "bg-emerald-500/80 text-emerald-50",
      Medium: "bg-amber-500/80 text-amber-50",
      Hard: "bg-rose-500/80 text-rose-50",
    };
    return colors[difficulty] || colors["Medium"];
  };

  return (
    <div className="w-[300px] h-full flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-b from-[#1D1D26] to-[#16161D] transition-all duration-300 hover:shadow-lg hover:shadow-indigo-900/10 hover:border-indigo-800/50 group">
      <div className="relative overflow-hidden">
        {/* Image */}
        <img
          src="./images/public.avif"
          alt={course || "Course"}
          className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161D] to-transparent opacity-60"></div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm text-xs font-medium">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span>4.8</span>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Course Title */}
        <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {course || "Course Title"}
        </h2>

        {/* Course Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
          {course_description || "Course description goes here"}
        </p>

        {/* Course Metadata */}
        <div className="flex justify-between items-center mt-auto">
          {/* Duration Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-900/30 text-indigo-400 text-xs font-medium">
            <Clock size={14} />
            <span>25 Hours</span>
          </div>

          {/* Difficulty Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getDifficultyColor()}`}
          >
            <BarChart2 size={14} />
            <span>Medium</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600/80 to-indigo-700/80 hover:from-indigo-600 hover:to-indigo-700 text-sm font-medium flex items-center justify-center gap-1.5 transition-all">
          <span>Start Learning</span>
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
