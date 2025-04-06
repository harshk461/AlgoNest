import SolutionBox from "components/Problems/SolutionBox";
import React from "react";

export default function Solutions() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-black rounded-xl border border-gray-800">
      <div className="border-b border-gray-800 pb-4 mb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-purple-400">Community Solutions</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Browse solutions from the community to learn different approaches
        </p>
      </div>

      <div className="space-y-4">
        <SolutionBox />
        <SolutionBox />
        <SolutionBox />
        <SolutionBox />
        <SolutionBox />
        <SolutionBox />
      </div>

      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-lg border border-purple-800/50 hover:bg-purple-900/50 transition-colors">
          Load More Solutions
        </button>
      </div>
    </div>
  );
}
