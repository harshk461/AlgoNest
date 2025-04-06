import React from "react";

export default function layout({ children }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
