"use client";

import { Plus, Send, X, Code, Eye, Tag, ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function PostSolutionPage() {
  const [title, setTitle] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="w-full flex flex-col min-h-screen bg-black text-gray-200">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-6 p-6">
        <div className="w-full flex flex-col gap-4 bg-[#1A1A24] rounded-xl border border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="w-full flex justify-between items-center p-4 border-b border-gray-800">
            <input
              className="block w-full outline-none border-none bg-transparent text-white placeholder:text-gray-500 text-2xl font-bold"
              autoComplete="off"
              placeholder="Enter your solution title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-3 items-center">
              <button className="px-4 py-2 bg-[#2A2A36] hover:bg-[#32323E] rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Send size={16} />
                Post Solution
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="w-full flex flex-col px-4">
            <div className="flex flex-wrap gap-2 items-center">
              <button className="flex gap-1 items-center px-3 py-1.5 rounded-lg text-sm bg-[#2A2A36] hover:bg-[#32323E] transition-colors">
                <Plus size={16} />
                Add Tags
              </button>

              {/* Example tags - would be dynamic in real implementation */}
              <TagPill label="Dynamic Programming" />
              <TagPill label="Arrays" />
            </div>
          </div>

          {/* Editor Controls */}
          <div className="w-full border-t border-b border-gray-800 px-4 py-2 bg-[#2A2A36] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded hover:bg-[#32323E] transition-colors">
                <Code size={18} className="text-purple-400" />
              </button>
              <div className="relative">
                <button className="flex items-center gap-1 p-2 rounded hover:bg-[#32323E] transition-colors">
                  <span>Language: JavaScript</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <button
                className={`px-4 py-1.5 rounded-l-lg font-medium transition-colors ${
                  !previewMode
                    ? "bg-[#32323E] text-purple-400"
                    : "bg-[#2A2A36] text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setPreviewMode(false)}
              >
                Edit
              </button>
              <button
                className={`px-4 py-1.5 rounded-r-lg font-medium transition-colors ${
                  previewMode
                    ? "bg-[#32323E] text-purple-400"
                    : "bg-[#2A2A36] text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setPreviewMode(true)}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Editor and Preview */}
          <div className="w-full flex border-b border-gray-800">
            {!previewMode ? (
              <div className="w-full p-4 min-h-[400px]">
                <textarea
                  className="w-full h-full min-h-[400px] bg-transparent border-none outline-none resize-none text-gray-300 font-mono"
                  placeholder="Write your solution here... You can use markdown for formatting."
                ></textarea>
              </div>
            ) : (
              <div className="w-full p-4 min-h-[400px] bg-[#1A1A24]">
                <div className="prose prose-invert max-w-none">
                  <h2>Solution Preview</h2>
                  <p>This is where the markdown preview would appear.</p>
                  <pre className="bg-[#2A2A36] p-4 rounded-lg">
                    <code className="text-gray-300">
                      {`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="w-full p-4 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Use Markdown to format your solution
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#2A2A36] hover:bg-[#32323E] rounded-lg font-medium transition-colors">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagPill({ label }) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-purple-900/30 text-purple-400 rounded-lg border border-purple-800/50">
      <Tag size={14} />
      <span className="text-sm">{label}</span>
      <button className="ml-1 hover:text-purple-300 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
