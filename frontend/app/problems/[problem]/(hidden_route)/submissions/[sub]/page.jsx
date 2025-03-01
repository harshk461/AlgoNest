"use client";

import { ChevronLeft, Link } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const { sub } = useParams();
  const router = useRouter();
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center border-b-2 border-b-gray-700 px-4 py-2">
        <div
          onClick={() => router.back()}
          className="flex gap-2 items-center cursor-pointer"
        >
          <ChevronLeft />
          <h1>Back</h1>
        </div>

        <Link size={20} />
      </div>

      <div className="flex flex-col p-4 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-green-500">Accepted</h1>
          <h1 className="text-md font-semibold text-gray-500">
            Date of Acceptance
          </h1>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <h1 className="text-md font-semibold text-gray-500">Code | C++</h1>
          <div className="flex flex-col bg-primary w-full rounded-lg p-4"></div>
        </div>
      </div>
    </div>
  );
}
