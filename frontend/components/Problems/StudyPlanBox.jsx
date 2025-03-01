import React from "react";

export default function StudyPlanBox() {
  return (
    <div className="w-auto p-3 flex gap-4 items-center bg-secondary hover:bg-opacity-60 rounded-lg transition duration-200">
      <img
        src="./images/image.png"
        alt=""
        className="rounded-[4px] mr-3.5 h-[72px] w-[72px]"
      />
      <div className="flex-grow py-1 h-[72px]">
        <div className="flex h-full flex-col justify-center">
          <div className="flex items-start">
            <p className="text-txt_primary font-medium mb-1.5 text-lc-text-primary dark:text-dark-lc-text-primary line-clamp-2">
              Top Interview 150
            </p>
          </div>
          <div className="ellipsis line-clamp-1 text-txt_secondary text-lc-text-tertiary dark:text-dark-lc-text-tertiary">
            Must-do List for Interview Prep
          </div>
        </div>
      </div>
    </div>
  );
}
