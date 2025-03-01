import React from "react";

export default function SolutionBox() {
  const topics = ["Dynamic Programming", "Arrays", "Sets"];
  return (
    <div className="w-full flex gap-4 items-start py-2 px-4">
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate max-w-[24px] max-h-[24px] min-h-[24px] min-w-[24px] h-6 w-6"
        href="/u/anwendeng/"
      >
        <img
          src="https://assets.leetcode.com/users/avatars/avatar_1675348402.png"
          alt=""
          class="rounded-1/2 object-cover h-full w-full rounded-full"
        />
      </a>

      <div className="w-full flex flex-col items-start border-b-2 border-b-[#323232] pb-3">
        <h1 className="text-sm text-[#747373] font-semibold mb-[2px]">
          Username
        </h1>
        <h1 className="text-lg font-bold mb-[4px]">Solution Title</h1>
        <div className="w-full flex gap-2 items-center">
          {topics.map((item, index) => (
            <div className="px-3 text-[12px] bg-[#323232] rounded-full">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
