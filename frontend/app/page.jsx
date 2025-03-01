"use client";

import React from "react";

import { courses } from "../data/Data";
import ReleaseNotes from "../components/Home/ReleaseNotes";
import Navbar2 from "../components/Others/Navbar2";
import Footer from "../components/Others/Footer";
import Courses from "../components/Home/Courses";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-2">
      <Navbar2 />
      <div className="w-full h-screen lg:px-[100px] p-2 flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold">AlgoNest</h1>
          <h1 className="text-3xl font-semibold">
            A better way to prepare for coding interviews.
          </h1>

          <button className="border-4 border-green-500 rounded-full text-3xl py-4 w-fit px-10 font-bold mt-10">
            Get Premimum
          </button>
        </div>
      </div>
      <ReleaseNotes />
      <div className="w-full flex flex-col items-center py-[100px]">
        <h1 className="text-6xl font-bold">Courses</h1>

        {courses &&
          courses.map((item, index) => (
            <Courses
              key={index}
              course={item.course}
              course_description={item.course_description}
              courses={item.courses}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}
