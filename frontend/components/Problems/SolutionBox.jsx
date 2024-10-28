import { Eye, MessageCircle, MoveUp } from "lucide-react";
import React from "react";

export default function SolutionBox() {
  return (
    <div className="w-full p-4 flex gap-4 items-start">
      <div>
        <div className="w-[40px] h-[40px] rounded-full bg-gray-400"></div>
      </div>
      <div className="w-full flex flex-col gap-2 border-b-2 border-b-[#3C3C3C] pb-4">
        <h1 className="text-[16px] leading-[20px] text-gray-300">Username</h1>
        <h1 className="text-lg text-white">Solution Name</h1>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 text-sm rounded-full bg-[#3C3C3C] text-[#909193]">
            Java
          </div>
          <div className="px-3 py-1 text-sm rounded-full bg-[#3C3C3C] text-[#909193]">
            Java
          </div>
          <div className="px-3 py-1 text-sm rounded-full bg-[#3C3C3C] text-[#909193]">
            Java
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <div className="flex gap-2 items-center">
            <MoveUp />1
          </div>
          <div className="flex gap-2 items-center">
            <Eye />1
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircle />1
          </div>
        </div>
      </div>
    </div>
  );
}
