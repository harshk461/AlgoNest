"use client";

import Link from "next/link";
import IDE from "@/components/Code-Editor/Code-Editor";
import { useParams, useRouter } from "next/navigation";
import { Book, FlaskConical, RotateCcw } from "lucide-react";
import Problem_Navbar from "@/components/Problems/Problem_Navbar";
import Navbar2 from "@/components/Others/Navbar2";

export default function ProblemLayout({ children }) {
  const params = useParams();
  const problemName = params.problem;

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar2 />

      <div className="flex w-full flex-grow overflow-y-hidden p-2 gap-2">
        <div className="w-full h-full flex flex-col border-2 border-[#333333] rounded-2xl">
          <nav className="bg-secondary py-2 px-4 rounded-t-lg flex space-x-2 border-b-2 border-b-[#585757]">
            <Link href={`/problems/${problemName}/description`}>
              <h1 className="text-white font-semibold flex items-center gap-1 hover:bg-gray-400 px-3 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-opacity-20">
                <Book size={20} color="dodgerblue" />
                Description
              </h1>
            </Link>
            <Link href={`/problems/${problemName}/solutions`}>
              <h1 className="text-white font-semibold flex items-center gap-1 hover:bg-gray-400 px-3 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-opacity-20">
                <FlaskConical size={20} color="dodgerblue" />
                Solutions
              </h1>
            </Link>
            <Link href={`/problems/${problemName}/submissions`}>
              <h1 className="text-white font-semibold flex items-center gap-1 hover:bg-gray-400 px-3 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-opacity-20">
                <RotateCcw size={20} color="gold" />
                Submission
              </h1>
            </Link>
          </nav>

          <div className="w-full h-full overflow-auto bg-secondary rounded-b-2xl">
            {children}
          </div>
        </div>

        {/* IDE Component with language, code, and setCode */}
        <div className="w-full h-full bg-[#262626] rounded-2xl">
          <IDE />
        </div>
      </div>
    </div>
  );
}
