import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-[1300px] border-t-2 border-t-gray-400 flex justify-between items-center py-4 px-10">
        <div className="flex gap-4">
          <Link
            href="https://leetcode.com/harshk461"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode size={30} />
          </Link>
          <Link
            href="https://github.com/harshk461"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} />
          </Link>
          <Link
            href="https://linkedin.com/in/harshk87"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={30} />
          </Link>
        </div>
        <div>Copyright © 2024 AlgoNest All rights reserved.</div>
      </div>
    </div>
  );
}
