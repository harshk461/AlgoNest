"use client";

import Link from "next/link";
import IDE from "@/components/Editor";
import { useParams } from "next/navigation";
import { Book, FlaskConical, RotateCcw } from "lucide-react";
import Navbar2 from "@/components/Navbar2";

export default function ProblemLayout({ children }) {
  const router = useParams();
  const problemName = router.problem;

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar2 />
      <div className="flex w-full h-full p-2 gap-2">
        <div className="w-full h-full flex flex-col border-2 border-[#333333] rounded-2xl">
          <nav className="bg-[#333333] py-2 px-4 rounded-t-lg flex space-x-2 border-b-2 border-b-[#585757]">
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

          <div className="w-full h-full overflow-auto bg-[#262626]">
            {children}
          </div>
        </div>
        <div className="w-full h-full bg-[#262626] rounded-2xl">
          <IDE />
        </div>
      </div>
    </div>
  );
}
