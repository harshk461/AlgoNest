"use client";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { CiAt, CiLock } from "react-icons/ci";
import React from "react";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";

export default function Page() {
  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      console.log("d");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-lg text-gray-500 mb-4">
        Currently, login-in is only available through Google and GitHub.
      </h1>
      <form className="flex flex-col gap-2 bg-white dark:bg-[#2F3136] p-8 w-[450px] rounded-2xl font-sans">
        <div className="flex flex-col">
          <label className="font-semibold">Email</label>
        </div>
        <div className="border border-[#ecedec] rounded-lg h-[50px] flex items-center px-2 transition duration-200 ease-in-out focus-within:border-[#2d79f3]">
          <CiAt size={20} />
          <input
            placeholder="Enter your Email"
            className="ml-2 rounded-lg border-none w-full h-full focus:outline-none bg-transparent"
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Password</label>
        </div>
        <div className="border border-[#ecedec] rounded-lg h-[50px] flex items-center px-2 transition duration-200 ease-in-out focus-within:border-[#2d79f3]">
          <CiLock />
          <input
            placeholder="Enter your Password"
            className="ml-2 rounded-lg border-none w-full h-full focus:outline-none bg-transparent"
            type="password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="radio" />
            <label className="text-sm font-normal">Remember me</label>
          </div>
          <span className="text-sm text-[#2d79f3] font-medium cursor-pointer">
            Forgot password?
          </span>
        </div>

        <button className="mt-5 mb-2 bg-[#151717] text-white text-sm font-medium rounded-lg h-[50px] w-full cursor-pointer">
          Sign In
        </button>

        <p className="text-center text-sm my-1">
          Don't have an account?{" "}
          <Link
            href={"/auth/sign-up"}
            className="text-[#2d79f3] font-medium cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-center text-sm my-1">Or With</p>

        <div className="flex gap-2">
          <button
            onClick={handleGoogleAuth}
            className="w-full h-[50px] border border-[#ededef] rounded-lg flex justify-center items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-[#2d79f3]"
          >
            <FaGoogle size={25} />
            Google
          </button>
          <button className="w-full h-[50px] border border-[#ededef] rounded-lg flex justify-center items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-[#2d79f3]">
            <FaGithub size={25} />
            Github
          </button>
        </div>
      </form>
    </div>
  );
}
