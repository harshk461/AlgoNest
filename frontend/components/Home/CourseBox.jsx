import React from "react";

export default function CourseBox({ course, course_description }) {
  return (
    <div className="w-[300px] flex flex-col rounded-xl shadow-lg shadow-black self-stretch text-center">
      <div>
        <img src="./images/public.avif" alt="" className="rounded-t-lg" />
      </div>
      <div className="flex flex-col items-center bg-[#232427] py-4 rounded-b-lg">
        <h1 className="text-[21px] font-bold text-center px-[20px]">
          {course}
        </h1>
        <h1 className="text-[16px] text-[#e1e1e1] text-center px-[10px] mt-[10px]">
          {course_description}
        </h1>
        <div className="flex gap-2 mt-[10px]">
          <div className="text-[11px] px-2 py-1 rounded-[6px] bg-[#2372b3] font-semibold">
            25 Hours
          </div>
          <div className="text-[11px] px-2 py-1 rounded-[6px] bg-[#ffe08a] font-semibold text-[#000000b3]">
            Medium
          </div>
        </div>
      </div>
    </div>
  );
}
