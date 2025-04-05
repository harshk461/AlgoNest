'use client';
import React from 'react';

export default function ViewButton({ row, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500"
    >
      View
    </button>
  );
}
