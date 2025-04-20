"use client";

import React, { useState, useMemo } from "react";

const Table = ({
  headers,
  data,
  hiddenFields = [],
  actionButtons,
  initialPageSize = 10,
  searchPlaceholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Function to render complex data types
  const renderCellValue = (value) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-500">—</span>;
    }

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        if (value.length === 0)
          return <span className="text-gray-500">Empty array</span>;

        return (
          <div className="max-h-[120px] overflow-y-auto custom-scrollbar">
            {value.map((item, idx) => (
              <div key={idx} className="mb-1 last:mb-0">
                {typeof item === "object" && item !== null ? (
                  <details className="cursor-pointer">
                    <summary className="text-blue-400 hover:text-blue-300 transition-colors">
                      {item.name || item.id || `Item ${idx + 1}`}
                    </summary>
                    <pre className="text-xs bg-gray-800/50 p-2 rounded mt-1 overflow-x-auto">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </details>
                ) : (
                  <span>{String(item)}</span>
                )}
              </div>
            ))}
          </div>
        );
      } else {
        // For objects (non-arrays)
        return (
          <details className="cursor-pointer">
            <summary className="text-blue-400 hover:text-blue-300 transition-colors">
              {value.name || value.id || "View Object"}
            </summary>
            <pre className="text-xs bg-gray-800/50 p-2 rounded mt-1 overflow-x-auto">
              {JSON.stringify(value, null, 2)}
            </pre>
          </details>
        );
      }
    }

    // For boolean values
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          True
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          False
        </span>
      );
    }

    // For dates
    if (
      value instanceof Date ||
      (typeof value === "string" &&
        !isNaN(Date.parse(value)) &&
        value.includes("-") &&
        value.includes(":"))
    ) {
      try {
        const date = new Date(value);
        return date.toLocaleString();
      } catch (e) {
        return String(value);
      }
    }

    // Default case: convert to string
    return String(value);
  };

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((row) => {
      return headers.some((header) => {
        if (hiddenFields.includes(header.key)) return false;

        const value = row[header.key];
        if (value === null || value === undefined) return false;

        // Handle different types of values for searching
        if (typeof value === "object") {
          if (Array.isArray(value)) {
            return value.some((item) =>
              String(item).toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          return JSON.stringify(value)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }

        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, headers, hiddenFields]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-lg bg-gradient-to-br from-gray-900/80 to-blue-900/30 border border-gray-700/30 relative">
      <div className="relative min-w-full align-middle p-4">
        {/* Search/Filter Section */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/30 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing page size
            }}
          >
            {[5, 10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>

        {/* Table Container */}
        <div className="border border-gray-700/30 rounded-xl overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <tr>
                {headers
                  .filter((header) => !hiddenFields.includes(header.key))
                  .map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                    >
                      {header.label || header.key}
                    </th>
                  ))}
                {actionButtons && (
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700/30">
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`group hover:bg-gray-800/30 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-gray-900/60" : "bg-gray-800/40"
                  } animate-fade-in`}
                >
                  {headers
                    .filter((header) => !hiddenFields.includes(header.key))
                    .map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 text-sm text-gray-300"
                      >
                        {renderCellValue(row[header.key])}
                      </td>
                    ))}
                  {actionButtons && (
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <div className="flex gap-x-2 justify-end">
                        {actionButtons(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr className="h-[100px] animate-fade-in">
                  <td
                    colSpan={headers.length + (actionButtons ? 1 : 0)}
                    className="text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No matching results found"
                      : "No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Showing{" "}
            {paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
            {filteredData.length} results
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800/50 hover:bg-gray-700/30 text-gray-300 transition-colors"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/50 hover:bg-gray-700/30 text-gray-300"
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-gray-500">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800/50 hover:bg-gray-700/30 text-gray-300 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800/50 hover:bg-gray-700/30 text-gray-300 transition-colors"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Glow Effect */}
      <div
        className="absolute -z-10 inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-xl pointer-events-none opacity-70 animate-pulse"
        style={{ animationDuration: "4s" }}
      />
    </div>
  );
};

// Add custom styles for scrollbars
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.7);
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
  
  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  
  .animate-glow {
    animation: glow 4s ease-in-out infinite;
  }
`;

// Inject styles once when component is imported
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default Table;
