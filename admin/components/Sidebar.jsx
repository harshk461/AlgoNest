"use client";

import appRoutes from "@/app/routes/appRoutes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dropdown from "./Common/Dropdown";
import { UserItem } from "./Common/UserItem";
import useAuthStatus from "@/hooks/useAuthStatus";
import { Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
<<<<<<< HEAD
=======
import problemRoutes from "@/app/routes/problemRoutes";
import adminRoutes from "@/app/routes/adminRoutes";
import userRoutes from "@/app/routes/userRoutes";
import contestRoutes from "@/app/routes/contestRoutes";
import analyticsRoutes from "@/app/routes/analyticsRoutes";
import submissionRoutes from "@/app/routes/submissionsRoutes";
import systemRoutes from "@/app/routes/systemRoutes";
import roadmapRoutes from "@/app/routes/roadmapRoutes";
>>>>>>> 2973b12 (new adds)

export default function Sidebar() {
  const path = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    { label: "My Account", href: "/account" },
    { label: "Settings", href: "/settings" },
    {
      label: "Sign Out",
      function: () => {
        console.log("Signing out...");
        localStorage.removeItem("token");
        dispatch(logout());
        navigate.replace("/auth/login");
      },
    },
  ];

  const { isAuthenticated } = useAuthStatus();

<<<<<<< HEAD
  if (!mounted) return null; // Prevent hydration error by delaying rendering

  return (
    <div className="h-screen w-[300px] bg-secondary flex flex-col">
      <h1 className="text-xl font-bold text-center py-4">AlgoNest</h1>

      <div className="w-full p-4 flex justify-between items-center border-y-2 border-y-foreground">
=======
  const routes = [
    { label: "Admin", routes: adminRoutes },
    { label: "Problems", routes: problemRoutes },
    { label: "Users", routes: userRoutes },
    { label: "Contest", routes: contestRoutes },
    {label: "Roadmaps", routes: roadmapRoutes },
    { label: "Analytics", routes: analyticsRoutes },
    { label: "Submissions", routes: submissionRoutes },
    { label: "Systems", routes: systemRoutes },
  ];

  if (!mounted) return null;

  return (
    <div className="h-screen w-[250px] flex-shrink-0 bg-gray-900 text-gray-200 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">AlgoNest</h1>
        <Sun className="text-yellow-400" />
      </div>

      {/* User Section */}
      <div className="w-full flex justify-between items-center px-4 py-4 border-b border-gray-700">
>>>>>>> 2973b12 (new adds)
        {isAuthenticated ? (
          <Dropdown items={items}>
            <UserItem name={"Harsh"} />
          </Dropdown>
        ) : (
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Login
          </Link>
        )}
      </div>

<<<<<<< HEAD
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
=======
      {/* Navigation Links */}
      <div className="overflow-y-auto mt-4">
        {routes.map((item, index) => (
          <div key={index} className="px-4 py-2">
            <h2 className="text-lg font-semibold mb-2 text-gray-300">{item.label}</h2>
            <div className="space-y-2">
              {item.routes.map((route, routeIndex) => (
                <Link
                  href={route.path}
                  key={routeIndex}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    path === route.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800"
                  } transition-all`}
                >
                  <div>{route.sideBarProps?.icon}</div>
                  <span>{route.sideBarProps?.displayText}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
>>>>>>> 2973b12 (new adds)
    </div>
  );
}
