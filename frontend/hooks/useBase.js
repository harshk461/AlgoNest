"use client";

export default function useBase() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    console.warn("NEXT_PUBLIC_BACKEND_URL is not defined in .env file");
  }

  return backendUrl;
}
