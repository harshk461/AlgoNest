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

import { onAuthStateChanged } from "firebase/auth"; // Import for authentication state change
import { auth } from "firebase/firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between p-4 bg-[#2A2A2A]">
      <div className="flex gap-4 items-center">
        <div>
          <Rocket size={25} color="red" />
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-200 px-4 py-1 rounded-full transition-all duration-200">
          <Menu size={20} />
          <h1 className="text-lg font-semibold">AlgoNest</h1>
        </div>
        <div className="flex gap-2">
          <div className="p-1 rounded-full hover:bg-gray-200 transition-all duration-200">
            <ChevronLeft />
          </div>
          <div className="p-1 rounded-full hover:bg-gray-200 transition-all duration-200">
            <ChevronRight />
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <button className="flex items-center px-4 py-1 rounded-xl bg-green-300 gap-2 text-lg font-semibold ">
          <Flame size={25} />
          Pro
        </button>
        <Sun />
        <div className="w-[40px] h-[40px] rounded-full bg-gray-300 shadow-md shadow-gray-400 flex items-center justify-center overflow-hidden">
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
      </div>
    </div>
  );
}
