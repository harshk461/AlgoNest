import React from "react";
import Navbar2 from "components/Others/Navbar2";

export default function layout({ children }) {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar2 />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
