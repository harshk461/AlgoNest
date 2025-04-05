"use client";

import React, { useState } from "react";
import axios from "axios";
import MultiSelect from "@/components/Common/MultipleSelect";
import Wrapper from "@/components/Wrapper";

export default function CreateContestPage() {
  const [contestDetails, setContestDetails] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    prizes: "",
    categories: [],
  });
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    { label: "Photography", value: "photography" },
    { label: "Writing", value: "writing" },
    { label: "Art", value: "art" },
    { label: "Coding", value: "coding" },
    { label: "Gaming", value: "gaming" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3090/contests/create", contestDetails);
      alert("Contest created successfully!");
      setContestDetails({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        prizes: "",
        categories: [],
      });
    } catch (error) {
      console.error("Error creating contest:", error);
      alert("Failed to create contest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Create a Contest
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contest Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Contest Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter contest name"
              value={contestDetails.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Contest Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter contest description"
              value={contestDetails.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
            ></textarea>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={contestDetails.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={contestDetails.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Prizes */}
          <div>
            <label
              htmlFor="prizes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Prizes
            </label>
            <input
              type="text"
              id="prizes"
              name="prizes"
              placeholder="Enter prizes (e.g., $500, Gift Cards)"
              value={contestDetails.prizes}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Categories */}
          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Categories
            </label>
            <MultiSelect
              options={categoryOptions}
              selectedValues={contestDetails.categories}
              onChange={(values) =>
                setContestDetails((prev) => ({ ...prev, categories: values }))
              }
              placeholder={"Select categories"}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-400"
            }`}
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
}
