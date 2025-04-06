"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  Flame,
  Menu,
  Rocket,
  Sun,
  Moon,
  User,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar2() {
  const [user, setUser] = useState(null); // Example user state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Theme toggle state
  const [activeLink, setActiveLink] = useState(""); // Active link state

  const navigate = useRouter();

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="relative">
      {/* Announcement Banner */}
      <div className="w-full bg-black text-white py-1 text-center text-xs font-medium relative overflow-hidden">
        <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <span className="relative z-10">
          🚀 New feature: AI-powered problem recommendations now available!
        </span>
      </div>

      {/* Navbar */}
      <div className="w-full bg-black text-white shadow-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate.replace("/")}
            >
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-1.5 rounded-lg">
                <Rocket size={22} className="text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                AlgoNest
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:space-x-4">
              {[
                { name: "Courses", href: "/" },
                { name: "Problems", href: "/problems" },
                { name: "Practice", href: "/practice" },
                { name: "Roadmap", href: "/roadmap" },
                { name: "Newsletters", href: "/newsletter" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeLink === link.name
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                  onClick={() => setActiveLink(link.name)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Items */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Premium Button */}
              <button
                onClick={() => navigate.push("/premium")}
                className="group relative overflow-hidden px-4 py-1.5 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-[15deg] transition-transform duration-300 group-hover:translate-x-full"></div>
                <div className="flex items-center relative z-10">
                  <Flame size={18} className="mr-1.5" />
                  Premium
                </div>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-300" />
                ) : (
                  <Moon size={18} className="text-gray-300" />
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-800/50 p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center overflow-hidden">
                    {user ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                  </div>
                  <ChevronDown size={14} className="text-gray-300" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-[10px] w-[200px] bg-[#1E1E1E] rounded-md shadow-lg ring-black ring-opacity-[15%] py-[8px] z-[100]">
                    <Link
                      href="/profile"
                      className="block px-[12px] py-[8px] text-sm text-gray-300 hover:bg-gray-800 transition-colors rounded-md"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-[12px] py-[8px] text-sm text-gray-300 hover:bg-gray-800 transition-colors rounded-md"
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 my-[6px]" />
                    <button
                      onClick={() => console.log("Sign out clicked")}
                      className="flex w-full items-center px-[12px] py-[8px] text-sm text-gray-300 hover:bg-gray-800 transition-colors rounded-md"
                    >
                      <LogOut size={14} className="mr-[6px]" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-[10px] rounded-md bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} aria-hidden />
              ) : (
                <Menu size={24} aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black absolute top-[64px] left-[0px] w-full z-[1000] shadow-lg border-t border-gray-700">
            {[
              { name: "Courses", href: "/" },
              { name: "Problems", href: "/problems" },
              { name: "Practice", href: "/practice" },
              { name: "Roadmap", href: "/roadmap" },
              { name: "Newsletters", href: "/newsletter" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-[16px] py-[12px] text-sm font-medium border-b border-gray-800 ${
                  activeLink === link.name
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
