import React from "react";
import CourseBox from "./CourseBox";

export default function Courses({ course, course_description, courses }) {
  return (
    <div
      className="w-full flex flex-col items-center py-[100px]"
      style={{ boxSizing: "inherit" }}
    >
      <div className="w-[1300px] max-w-full mt-[80px] ">
        {/* Each Course */}
        <div className="w-full flex justify-between items-start gap-[100px]">
          <div className="w-[500px] flex flex-col gap-2">
            <h1 className="text-5xl font-bold">{course}</h1>
            <h1 className="text-xl mt-4">{course_description}</h1>
          </div>
          <div className="w-[800px] flex flex-wrap gap-4 justify-center items-center">
            {courses.map((item, index) => (
              <CourseBox
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
