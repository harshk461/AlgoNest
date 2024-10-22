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
import { auth } from "@/firebase/firebase";

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

  return (
    <div className="flex justify-between p-4 bg-[#2F3136]">
      <div className="flex gap-4 items-center">
        <div>
          <Rocket size={25} color="red" />
        </div>
        <Link
          href={"/"}
          className="text-lg font-semibold px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Courses
        </Link>
        <Link
          href={"/"}
          className="text-lg font-semibold px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Practice
        </Link>
        <Link
          href={"/"}
          className="text-lg font-semibold px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
        >
          Roadmap
        </Link>
        <Link
          href={"/"}
          className="text-lg font-semibold px-4 py-2 hover:bg-gray-900 rounded-full bg-opacity-40"
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
