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

export default function Sidebar() {
  const path = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();

  // Ensure this runs only on the client
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

  if (!mounted) return null; // Prevent hydration error by delaying rendering

  return (
    <div className="h-screen w-[300px] bg-secondary flex flex-col">
      <h1 className="text-xl font-bold text-center py-4">AlgoNest</h1>

      <div className="w-full p-4 flex justify-between items-center border-y-2 border-y-foreground">
        {isAuthenticated ? (
          <Dropdown items={items}>
            <UserItem name={"Harsh"} />
          </Dropdown>
        ) : (
          <div className="w-full flex justify-between items-center">
            <Sun />
            <Link
              href={"/auth/login"}
              className="px-4 py-2 bg-background rounded-lg"
            >
              Login
            </Link>
          </div>
        )}
      </div>

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
