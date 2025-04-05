"use client";
import { login } from "@/store/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3090/auth/login", data);
      const d = res.data;
      if (d.accessToken) {
        dispatch(login({ user: d.user, token: d.accessToken }));
        navigate.replace("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 backdrop-blur-lg border border-gray-100"
      >
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to continue to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <input
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>
              <input
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Enter your password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow relative"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Sign in"
            )}
          </motion.button>

          <div className="text-center">
            <a
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                {/* Google SVG icon */}
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                {/* GitHub SVG icon */}
              </svg>
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
