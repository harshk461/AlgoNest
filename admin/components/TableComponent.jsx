import React from "react";

const Table = ({ headers, data, onView, hiddenFields = [] }) => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border overflow-hidden dark:border-neutral-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  {headers
                    .filter((header) => !hiddenFields.includes(header.key)) // Exclude hidden fields
                    .map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        {header.label}
                      </th>
                    ))}
                  <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers
                      .filter((header) => !hiddenFields.includes(header.key)) // Exclude hidden fields
                      .map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
                        >
                          {typeof row[header.key] === "object"
                            ? JSON.stringify(row[header.key]) // Convert object to string
                            : row[header.key]}
                        </td>
                      ))}
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => onView(row)}
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan={headers.length + 1 - hiddenFields.length}
                      className="px-6 py-4 text-center text-gray-500 dark:text-neutral-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
=======
    <div className="w-full overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-lg bg-gradient-to-br from-gray-900/80 to-blue-900/30 border border-gray-700/30">
      <div className="relative min-w-full align-middle p-4">
        {/* Search/Filter Section */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white flex items-center gap-2 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Table Container */}
        <div className="border border-gray-700/30 rounded-xl overflow-x-scroll">
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
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`group hover:bg-gray-800/30 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } animate-fade-in`}
                >
                  {headers
                    .filter((header) => !hiddenFields.includes(header.key))
                    .map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 text-sm text-gray-300"
                      >
                        {Array.isArray(row[header.key])
                          ? row[header.key].join(", ")
                          : row[header.key]}
                      </td>
                    ))}
                  {actionButtons && (
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-x-[5px]">
                      {actionButtons(row)}
                    </td>
                  )}
                </tr>
              ))}

              {data.length === 0 && (
                <tr className="h-[100px] animate-fade-in">
                  <td
                    colSpan={headers.length + (actionButtons ? 1 : 0)}
                    className="text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
>>>>>>> 2973b12 (new adds)
        </div>

        {/* Pagination */}
        <div className="mt-[20px] flex justify-between items-center px-[10px]">
          <span className="text-sm text-gray-[400]">Showing X of Y results</span>
          <div className="flex gap-[10px]">
            <button className="p-[10px] rounded-md bg-gray-[800]/50 hover:bg-gray-[700]/30 transition-colors">
              Previous
            </button>
            <button className="p-[10px] rounded-md bg-gray-[800]/50 hover:bg-gray-[700]/30 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Glow Effect */}
      <div 
        className="-z-[10] absolute inset-[0] bg-radial-gradient from-blue-[500]/20 to-transparent blur-xl pointer-events-none animate-glow"
      />
    </div>
  );
};

export default Table;
