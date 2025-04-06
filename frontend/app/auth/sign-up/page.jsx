"use client";
import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { CiAt, CiLock, CiUser } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiUrl = "https://your-api-url.com"; // Replace with your actual API URL
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        router.push("/auth/verify-email"); // Redirect to verification page
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-6 bg-gray-800 p-8 w-[400px] rounded-xl shadow-lg"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <p className="text-sm text-gray-400 text-center">
          Join our community of problem solvers
        </p>

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        {/* Name Input */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-300">Full Name</label>
          <div className="border border-gray-600 rounded-lg h-[50px] flex items-center px-3 focus-within:border-blue-500 transition">
            <CiUser size={20} />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="ml-2 bg-transparent outline-none border-none w-full text-white"
            />
          </div>
        </div>

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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="ml-2 bg-transparent outline-none border-none w-full text-white"
            />
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-300">Confirm Password</label>
          <div className="border border-gray-600 rounded-lg h-[50px] flex items-center px-3 focus-within:border-blue-500 transition">
            <CiLock size={20} />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="ml-2 bg-transparent outline-none border-none w-full text-white"
            />
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 h-[50px] rounded-lg bg-blue-600 hover:bg-blue-700 transition-all font-bold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-4">
          <span className="absolute inset-x-0 top-[50%] h-[1px] bg-gray-600"></span>
          <span className="bg-gray-800 px-4 relative z-[1] text-sm text-gray-400">
            Or continue with
          </span>
        </div>

        {/* Social Signup Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => alert("Google Signup")}
            className="flex items-center justify-center gap-2 w-full h-[50px] border border-gray-600 rounded-lg hover:border-blue-500 transition-all"
          >
            <FaGoogle size={20} />
            Google
          </button>
          
          <button
            type="button"
            onClick={() => alert("GitHub Signup")}
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
