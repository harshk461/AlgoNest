import React from "react";

export default function Tooltip({ children, text }) {
  return (
    <div className="group relative">
      {children}
      <div className="bg-primary p-2 rounded-md group-hover:flex hidden absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2">
        <span className="text-zinc-400 whitespace-nowrap">{text}</span>
        <div className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
}
