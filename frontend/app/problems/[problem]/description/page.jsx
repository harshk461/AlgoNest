import React from "react";

export default function Description() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-lg font-semibold">Problem Name</h1>
      <h1 className="font-semibold text-yellow-300">Medium</h1>
      <div className="w-full flex flex-col gap-3">
        <h1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel, neque.
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste numquam
          animi dicta voluptates nostrum quae? Laudantium doloremque tempora
          commodi minus!
        </h1>
      </div>
      {/* Given Testcases */}
      <div className="w-full flex flex-col gap-8 mt-8">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-md font-semibold">Example 1:</h1>

          <div className="w-full p-3 bg-gray-700 rounded-lg flex flex-col gap-4">
            <div className="flex gap-3">
              <h1 className="font-semibold text-green-700">Input:</h1>
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, natus?
              </h1>
            </div>

            <div className="flex gap-3">
              <h1 className="font-semibold text-green-700">Output:</h1>
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, natus?
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-md font-semibold">Example 1:</h1>

          <div className="w-full p-3 bg-gray-700 rounded-lg flex flex-col gap-4">
            <div className="flex gap-3">
              <h1 className="font-semibold text-green-700">Input:</h1>
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, natus?
              </h1>
            </div>

            <div className="flex gap-3">
              <h1 className="font-semibold text-green-700">Output:</h1>
              <h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, natus?
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Constraints */}
      <div className="flex flex-col gap-4">
        <h1>Constraints:</h1>

        <ul className="list-disc list-inside ml-4 space-y-4">
          <li>
            <h1 className="bg-gray-700 inline-block px-3 rounded-lg">
              {"1 <= temperatures.length <= 105"}
            </h1>
          </li>
          <li>
            <h1 className="bg-gray-700 inline-block px-3 rounded-lg">
              {"1 <= temperatures.length <= 105"}
            </h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
