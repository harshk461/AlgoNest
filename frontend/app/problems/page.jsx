import Navbar2 from "@/components/Navbar2";
import FilterDropDown from "@/components/Problems/FilterDropDown";
import QuestionTable from "@/components/Problems/QuestionTable";
import StudyPlanBox from "@/components/Problems/StudyPlanBox";
import { Search, Settings, Shuffle } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col">
      <Navbar2 />
      <div className="w-[1400px] m-auto flex justify-start gap-[50px] mt-[80px]">
        <div className="w-full px-4 flex flex-col">
          {/* Study Plans */}
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex justify-between">
              <h1 className="text-lg ">Study Courses</h1>
              <h1 className="text-blue-400 underline text-md">See More</h1>
            </div>
            {/* Courses */}
            <div className="grid grid-cols-3 gap-4">
              <StudyPlanBox />
              <StudyPlanBox />
              <StudyPlanBox />
              <StudyPlanBox />
              <StudyPlanBox />
              <StudyPlanBox />
            </div>
          </div>

          {/* Problems */}

          <div className="flex flex-col gap-4 my-4">
            <div className="w-full flex gap-3 items-center">
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

              <div className="w-full h-auto flex-grow flex items-center px-4 py-2 gap-4 bg-secondary rounded-lg">
                <Search />
                <input
                  type="text"
                  placeholder="Search Question..."
                  className="bg-transparent w-full outline-none text-lg"
                />
              </div>

              <button className="flex h-full items-center px-4 gap-4 bg-secondary rounded-lg">
                <Settings />
              </button>

              <div className="flex gap-3 items-center min-w-[150px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#6FC366] flex items-center justify-center">
                  <Shuffle color="white" />
                </div>
                <h1 className="text-lg font-semibold text-[#6FC366]">
                  Pick One
                </h1>
              </div>
            </div>
            <QuestionTable />

            <div className="w-full flex justify-between items-center">
              <FilterDropDown
                title={"50 / page"}
                options={["50 / pages", "25 / pages", "10 / pages"]}
              />

              <div></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-[350px] h-fit flex flex-col items-start gap-4 py-4 rounded-2xl bg-secondary">
          <h1 className="text-xl font-semibold px-4 h-9">Stats</h1>
          <div className="w-full flex justify-between px-4 gap-4">
            <div className="w-[100px] h-[100px] border-4 border-gray-600 rounded-full flex-shrink-0"></div>{" "}
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between text-lg font-semibold">
                <h1 className="text-green-600">Easy</h1>
                <h1>200</h1>
              </div>
              <div className="w-full flex justify-between text-lg font-semibold">
                <h1 className="text-yellow-600">Medium</h1>
                <h1>200</h1>
              </div>
              <div className="w-full flex justify-between text-lg font-semibold">
                <h1 className="text-red-600">Hard</h1>
                <h1>200</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
