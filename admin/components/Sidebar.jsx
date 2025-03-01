"use client";
import appRoutes from "@/app/routes/appRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const path = usePathname();
  return (
    <div className="h-screen w-[300px] bg-secondary flex flex-col">
      <h1 className="text-xl font-bold text-center py-4">AlgoNest</h1>
      {appRoutes.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className={`w-full flex px-4 py-3 justify-evenly 
            hover:bg-red
            ${path == item.path ? "" : ""}`}
        >
          <div>{item.sideBarProps.icon}</div>
          <div className="">{item.sideBarProps.displayText}</div>
        </Link>
      ))}
    </div>
  );
}
