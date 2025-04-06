"use client";
import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { CiAt, CiLock } from "react-icons/ci";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful:", data);
        // Handle successful login (e.g., save token, redirect)
      } else {
        console.error("Login Failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 bg-gray-800 p-8 w-[400px] rounded-xl shadow-lg"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-sm text-gray-400 text-center">
          Login to access your account
        </p>

        {/* Email Input */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-300">Email</label>
          <div className="border border-gray-600 rounded-lg h-[50px] flex items-center px-3 focus-within:border-blue-500 transition">
            <CiAt size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="ml-2 bg-transparent outline-none border-none w-full text-white"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-300">Password</label>
          <div className="border border-gray-600 rounded-lg h-[50px] flex items-center px-3 focus-within:border-blue-500 transition">
            <CiLock size={20} />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="ml-2 bg-transparent outline-none border-none w-full text-white"
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            Remember me
          </label>
          <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 h-[50px] rounded-lg bg-blue-600 hover:bg-blue-700 transition-all font-bold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-4">
          <span className="absolute inset-x-0 top-[50%] h-[1px] bg-gray-600"></span>
          <span className="bg-gray-800 px-4 relative z-[1] text-sm text-gray-400">
            Or continue with
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4">
          {/* Google Login */}
          <button
            type="button"
            onClick={() => alert("Google Login")}
            className="flex items-center justify-center gap-2 w-full h-[50px] border border-gray-600 rounded-lg hover:border-blue-500 transition-all"
          >
            <FaGoogle size={20} />
            Google
          </button>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={() => alert("GitHub Login")}
            className="flex items-center justify-center gap-2 w-full h-[50px] border border-gray-600 rounded-lg hover:border-blue-500 transition-all"
          >
            <FaGithub size={20} />
            GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
