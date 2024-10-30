"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { CiAt, CiLock } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/firebase";
import { authenticateUser } from "@/app/functions/auth";

export default function Signup() {
  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser();
      // router.replace("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-lg text-gray-500 mb-4">
        Currently, sign-up is only available through Google and GitHub.
      </h1>
      <form className="flex flex-col gap-2 bg-white dark:bg-[#2F3136] p-8 w-[450px] rounded-2xl font-sans">
        <div className="flex flex-col">
          <label className="font-semibold">Name</label>
        </div>
        <div className="border border-[#ecedec] rounded-lg h-[50px] flex items-center px-2 transition duration-200 ease-in-out focus-within:border-[#2d79f3]">
          <CiAt size={20} />
          <input
            placeholder="Enter your Name"
            className="ml-2 rounded-lg border-none w-full h-full focus:outline-none bg-transparent"
            type="text"
          />
        </div>

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

        <div className="flex flex-col">
          <label className="font-semibold">Confirm Password</label>
        </div>
        <div className="border border-[#ecedec] rounded-lg h-[50px] flex items-center px-2 transition duration-200 ease-in-out focus-within:border-[#2d79f3]">
          <CiLock />
          <input
            placeholder="Confirm Password"
            className="ml-2 rounded-lg border-none w-full h-full focus:outline-none bg-transparent"
            type="password"
          />
        </div>

        <button className="mt-5 mb-2 bg-[#151717] text-white text-sm font-medium rounded-lg h-[50px] w-full cursor-pointer">
          Sign Up
        </button>

        <p className="text-center text-sm my-1">
          Already have an Account?{" "}
          <Link
            href={"/auth/login"}
            className="text-[#2d79f3] font-medium cursor-pointer"
          >
            Sign In
          </Link>
        </p>
        <p className="text-center text-sm my-1">Or With</p>

        <div className="flex gap-2">
          <button
            onClick={handleSignup}
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
