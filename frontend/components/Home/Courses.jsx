import React from "react";
import CourseBox from "./CourseBox";
import { ChevronRight } from "lucide-react";

export default function Courses({ course, course_description, courses }) {
  return (
    <div
      className="w-full flex flex-col items-center py-16 justify-center"
      style={{ boxSizing: "inherit" }}
    >
      <div className="flex-1 px-4 sm:px-6 lg:px-8 flex justify-between m-auto">
        {/* Each Course */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-950/30 rounded-full mb-2 border border-indigo-800/40 w-fit">
              <span className="text-indigo-400 text-sm font-medium">
                Featured Track
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {course || "Course Track"}
            </h1>
            <p className="text-xl text-gray-300 mt-4">
              {course_description || "Course track description"}
            </p>
            <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors w-fit flex items-center gap-2">
              <span>View All Courses</span>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 lg:mt-0">
            {Array.isArray(courses) &&
              courses.map((item, index) => (
                <CourseBox
                  key={index}
                  course={item.course}
                  course_description={item.course_description}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
