"use client";
import { login } from "@/store/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3090/auth/login", data);
      const d = res.data;

      if (d.accessToken) {
        dispatch(login({ user: d.user, token: d.accessToken })); // Include token here
        navigate.replace("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-80">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full h-12 text-black border border-gray-300 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            className="w-full h-12 text-black border border-gray-300 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign in"}
          </button>
          <a
            className="block text-center text-blue-500 hover:underline text-sm"
            href="#"
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
}
