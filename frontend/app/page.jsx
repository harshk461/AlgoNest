"use client";

import Courses from "@/components/Courses";
import Navbar2 from "@/components/Navbar2";
import ReleaseNotes from "@/components/ReleaseNotes";
import React from "react";

import data from "../data/Data";
import Footer from "@/components/Footer";

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

        {data &&
          data.map((item, index) => (
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
