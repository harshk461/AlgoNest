import React from "react";

export default function FlexWrapper({ children, className }) {
  return (
    <div className={`w-full h-full p-4 lg:p-16 ${className} overflow-x-auto flex flex-col gap-4`}>
      {children}
    </div>
  );
}
