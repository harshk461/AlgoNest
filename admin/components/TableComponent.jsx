import React from "react";

const Table = ({ headers, data, onView, hiddenFields = [] }) => {
  return (
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
        </div>
      </div>
    </div>
  );
};

export default Table;
