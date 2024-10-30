import React, { useState, useRef } from "react";

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleCollapse = ({ title }) => {
    setIsOpen(!isOpen);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full px-4 py-3 flex justify-between items-center border-2 border-[#3d3d3d]  rounded-lg">
        <button
          onClick={toggleCollapse}
          className="w-full text-left focus:outline-none text-lg font-semibold"
        >
          {capitalizeFirstLetter(title)}
        </button>

        {/* <div className="w-full flex gap-4 items-center">
          <div>(7/14)</div>

          <div className="w-full h-3 rounded-xl bg-white">
            <div className="w-1/2 h-full rounded-l-xl bg-green-400"></div>
          </div>
        </div> */}
      </div>

      <div
        ref={contentRef}
        className={`transition-[height] duration-500 ease-out overflow-hidden`}
        style={{
          height: isOpen ? contentRef.current.scrollHeight : 0,
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
