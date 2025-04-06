"use client";

import Link from "next/link";
import IDE from "@/components/Code-Editor/Code-Editor";
import { useParams, useRouter } from "next/navigation";
import { Book, FlaskConical, RotateCcw, Code, ChevronLeft } from "lucide-react";

export default function ProblemLayout({ children }) {
  const params = useParams();
  const problemName = params.problem;

  return (
    <div className="flex flex-col w-full h-screen bg-black text-gray-200">
      {/* Header with back button */}
      <div className="flex items-center gap-3 p-3 border-b border-gray-800">
        <Link
          href="/problems"
          className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="text-sm font-medium">Back to Problems</span>
        </Link>
      </div>
      <div className="flex w-full flex-grow overflow-y-hidden p-4 gap-4">
        {/* Problem description panel */}
        <div className="w-full h-full flex flex-col rounded-xl border border-gray-800 overflow-hidden">
          <nav className="bg-[#1A1A24] py-2 px-4 flex space-x-1 border-b border-gray-800">
            <NavLink
              href={`/problems/${problemName}/description`}
              icon={<Book size={18} className="text-purple-400" />}
              label="Description"
            />
            <NavLink
              href={`/problems/${problemName}/solutions`}
              icon={<FlaskConical size={18} className="text-purple-400" />}
              label="Solutions"
            />
            <NavLink
              href={`/problems/${problemName}/submissions`}
              icon={<RotateCcw size={18} className="text-purple-400" />}
              label="Submissions"
            />
          </nav>

          <div className="w-full h-full overflow-auto bg-black">{children}</div>
        </div>

        {/* IDE Component */}
        <div className="w-full h-full flex flex-col rounded-xl border border-gray-800 overflow-hidden">
          <div className="bg-[#1A1A24] py-2 px-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Code size={18} className="text-purple-400" />
              <h2 className="font-medium">Code Editor</h2>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex-grow">
            <IDE />
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Link Component
function NavLink({ href, icon, label }) {
  return (
    <Link href={href} className="group">
      <div className="text-gray-300 font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#2A2A36] group-hover:text-purple-400">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}
