"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Menu,
  Rocket,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Navbar2() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Subscribe to the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false); // Close dropdown after logout
  };

<<<<<<< HEAD
  return (
    <div className="flex justify-between px-8 py-2 bg-[#2A2A2A]">
      <div className="flex gap-2 items-center">
        <div>
          <Rocket size={25} color="red" />
=======
  const navigate=useRouter();

return (
  <div className="relative">
   <div className="w-full bg-black text-white py-1 text-center text-xs font-medium relative overflow-hidden">
      <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <span className="relative z-10">New feature: AI-powered problem recommendations now available!</span>
    </div>

    <div className="w-full bg-black text-white shadow-lg border-b border-gray-800/50">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer"
             onClick={()=>navigate.replace("/")}>
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-1.5 rounded-lg">
                <Rocket size={22} className="text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                AlgoNest
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-2">
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
                  onClick={() => {
                    setActiveLink(link.name);
                    console.log(activeLink);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Pro Button */}
            <button
            onClick={()=>navigate.push("/premium")}
             className="group relative overflow-hidden px-4 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 transition-transform duration-300 group-hover:translate-x-full"></div>
              <div className="flex items-center relative z-10">
                <Flame size={18} className="mr-1.5" />
                <span>Premium</span>
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
                className="flex items-center space-x-2 bg-gray-800/50 p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center overflow-hidden">
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
                <ChevronDown size={14} className="text-gray-300 mr-1" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-800 my-1"></div>
                  <button className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                    <LogOut size={14} className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
>>>>>>> 2973b12 (new adds)
        </div>
        <Link
          href={"/"}
          className="text-md px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Courses
        </Link>
        <Link
          href={"/problems"}
          className="text-md px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Problems
        </Link>
        <Link
          href={"/practice"}
          className="text-md px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Practice
        </Link>
        <Link
          href={"/"}
          className="text-md px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Roadmap
        </Link>
        <Link
          href={"/"}
          className="text-md px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Newsletters
        </Link>
      </div>
      <div className="flex gap-4 items-center relative">
        <button className="flex items-center px-4 py-1 rounded-xl bg-green-300 gap-2 text-lg font-semibold ">
          <Flame size={25} />
          Pro
        </button>
        <Sun />
        <div
          className="w-[40px] h-[40px] rounded-full bg-gray-300 shadow-md shadow-gray-400 flex items-center justify-center overflow-hidden cursor-pointer relative"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on click
        >
          {user ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600"></div>
          )}
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
            <Link
              href="/profile" // Link to the profile page
              className="block px-4 py-2 text-black hover:bg-gray-200 rounded-lg"
              onClick={() => setDropdownOpen(false)} // Close dropdown on click
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
