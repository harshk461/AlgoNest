import React from "react";

export default function Button({ title, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`w-fit m-auto px-6 py-2 rounded-lg bg-foreground text-secondary font-semibold ${className}`}
    >
      {title}
    </button>
  );
}
