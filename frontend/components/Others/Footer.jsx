import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed left-0 bottom-0 bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              AlgoNest
            </h2>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Empowering developers with cutting-edge algorithmic knowledge and
              practice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <SocialLink
                href="https://leetcode.com/harshk461"
                icon={<SiLeetcode size={24} />}
                label="LeetCode"
              />
              <SocialLink
                href="https://github.com/harshk461"
                icon={<FaGithub size={24} />}
                label="GitHub"
              />
              <SocialLink
                href="https://linkedin.com/in/harshk87"
                icon={<FaLinkedinIn size={24} />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://twitter.com/algonest"
                icon={<FaTwitter size={24} />}
                label="Twitter"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} AlgoNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-indigo-400 transition-colors"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
