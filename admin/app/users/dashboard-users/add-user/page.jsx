"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { X, AlertCircle, CheckCircle,Save, UserPlus } from "lucide-react";
import { Controller } from "react-hook-form";


// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters"),
  username: yup.string().required("Username is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  role: yup.string().oneOf(["user", "admin", "instructor"]).required("Role is required"),
  isAdmin: yup.boolean().default(true),
  isActive: yup.boolean().default(true),
});

export default function page() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      isAdmin: true,
      role: "admin",
      isActive: true,
      isEmailVerified: true,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // API call to create admin user
      const response = await axios.post("/api/admin/users", data);
      
      setSuccessMessage("Admin user created successfully!");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error creating admin user:", error);
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to create admin user"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <FormHeader 
        title="Create Admin User" 
        icon={<UserPlus className="h-6 w-6" />} 
      />

      <div className="backdrop-blur-lg bg-gradient-to-br from-gray-900/80 to-blue-900/30 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <FormSection 
              title="Basic Information" 
              className="col-span-1 md:col-span-2"
            />

            <TextInput
              name="firstName"
              label="First Name"
              control={control}
              errors={errors}
              required
            />

            <TextInput
              name="lastName"
              label="Last Name"
              control={control}
              errors={errors}
              required
            />

            <TextInput
              name="email"
              label="Email"
              type="email"
              control={control}
              errors={errors}
              required
            />

            <TextInput
              name="username"
              label="Username"
              control={control}
              errors={errors}
              required
            />

            <TextInput
              name="password"
              label="Password"
              type="password"
              control={control}
              errors={errors}
              required
            />

            <TextInput
              name="fullName"
              label="Full Name (Optional)"
              control={control}
              errors={errors}
            />

            {/* Additional Information */}
            <FormSection 
              title="Additional Information" 
              className="col-span-1 md:col-span-2"
            />

            <SelectInput
              name="gender"
              label="Gender"
              control={control}
              options={[
                { value: "", label: "Select Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]}
            />

            <TextInput
              name="profilePicture"
              label="Profile Picture URL"
              control={control}
              errors={errors}
            />

            {/* Role and Status */}
            <FormSection 
              title="Role and Status" 
              className="col-span-1 md:col-span-2"
            />

            <SelectInput
              name="role"
              label="Role"
              control={control}
              errors={errors}
              options={[
                { value: "admin", label: "Admin" },
                { value: "instructor", label: "Instructor" },
                { value: "user", label: "User" }
              ]}
              required
            />

            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <CheckboxInput
                name="isAdmin"
                label="Admin Privileges"
                control={control}
              />

              <CheckboxInput
                name="isActive"
                label="Active Account"
                control={control}
              />

              <CheckboxInput
                name="isEmailVerified"
                label="Email Verified"
                control={control}
              />
            </div>

            <ButtonGroup
              loading={loading}
              onReset={() => reset()}
              className="col-span-1 md:col-span-2 mt-6"
            />
          </div>
        </form>
      </div>

      {/* Success/Error messages */}
      <AlertMessage 
        type="success"
        message={successMessage}
        onClose={handleCloseAlert}
      />

      <AlertMessage 
        type="error"
        message={errorMessage}
        onClose={handleCloseAlert}
      />
    </div>
  );
}


function FormHeader({ title, icon }) {
  return (
    <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
      {icon}
      {title}
    </h1>
  );
}


function FormSection({ title, className }) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold mb-4 border-b pb-2 mt-4">
        {title}
      </h2>
    </div>
  );
}


function TextInput({ 
  name, 
  label, 
  control, 
  errors, 
  type = "text", 
  required = false 
}) {
  return (
    <div className="col-span-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              {...field}
              type={type}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[name] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[name].message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

function SelectInput({ 
  name, 
  label, 
  control, 
  errors, 
  options,
  required = false 
}) {
  return (
    <div className="col-span-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              {...field}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors && errors[name] ? "border-red-500" : "border-gray-300"
              }`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors && errors[name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[name].message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

function CheckboxInput({ name, label, control }) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              {...field}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={name}
              className="ml-2 text-sm text-gray-700"
            >
              {label}
            </label>
          </div>
        )}
      />
    </div>
  );
}


function ButtonGroup({ loading, onReset, className }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <Save className="h-4 w-4" />
        )}
        Create Admin User
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={loading}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Reset Form
      </button>
    </div>
  );
}


function AlertMessage({ type, message, onClose }) {
  if (!message) return null;

  const isSuccess = type === "success";
  
  return (
    <div className={`fixed bottom-4 right-4 ${isSuccess ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"} border-l-4 p-4 rounded shadow-lg max-w-md`}>
      <div className="flex items-start">
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
        )}
        <div className="flex-1">
          <p className={isSuccess ? "text-green-800" : "text-red-800"}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
