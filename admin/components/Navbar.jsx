import { Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center p-6">
      <div className="flex gap-6 items-center">
        <Rocket size={30} />
        <Link className="text-md font-semibold" href={"/add-problem"}>
          Add Problem
        </Link>
        <Link className="text-md font-semibold" href={"/"}>
          Add Testcase
        </Link>
        <Link className="text-md font-semibold" href={"/"}>
          User Management
        </Link>
        <Link className="text-md font-semibold" href={"/"}>
          Analytics and Management
        </Link>
        <Link className="text-md font-semibold" href={"/"}>
          Moderation and Submissions
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
}
