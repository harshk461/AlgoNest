import Navbar2 from "@/components/Navbar2";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar2 />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
