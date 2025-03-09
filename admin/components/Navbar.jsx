"use client";
import { Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";
import Dropdown from "./Common/Dropdown";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-6 py-4">
      <div></div>
      <Dropdown options={["sdhj"]} />
    </div>
  );
}
