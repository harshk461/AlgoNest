"use client";

import Heading from "@/components/Common/Heading";
import MultiSelect from "@/components/Common/MultipleSelect";
import FlexWrapper from "@/components/FlexWrapper";

import axios from "axios";
import React, { useState } from "react";
import adminService from "../actions/AdminService";

export default function Page() {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const body={role,permissions};

      await adminService.addNewRole(body);

    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const permissions_array = [
    { label: "Read", value: "read" },
    { label: "Write", value: "write" },
    { label: "Delete", value: "delete" },
    { label: "Update", value: "update" },
    { label: "Super Access", value: "super-access" },
  ];

  return (
    <FlexWrapper className="flex flex-col gap-6 items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        {/* Page Heading */}
        <Heading
          heading="Add New Role"
          className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        />

        {/* Form */}
        <form onSubmit={handleAddRole} className="space-y-6">
          {/* Role Input */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Role Name
            </label>
            <input
              id="role"
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Role Name..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          {/* Permissions MultiSelect */}
          <div>
            <label
              htmlFor="permissions"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Permissions
            </label>
            <MultiSelect
              id="permissions"
              options={permissions_array}
              selectedValues={permissions}
              onChange={setPermissions}
              placeholder="Select Permissions..."
              className="border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-400"
            }`}
          >
            {loading ? "Adding..." : "Add Role"}
          </button>
        </form>
      </div>
    </FlexWrapper>
  );
}
