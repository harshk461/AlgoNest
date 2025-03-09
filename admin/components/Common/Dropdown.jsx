import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dropdown({ items = [], children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    // Close dropdown first
    setIsOpen(false);

    // Handle function if provided
    if (item.function && typeof item.function === "function") {
      item.function();
    }
    // Handle href if provided and no function
    else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-medium text-gray-800 dark:text-gray-200 outline-none
        px-4 py-2.5 rounded-lg 
        border border-gray-200 dark:border-background transition-all duration-300
        shadow-sm hover:shadow-md"
      >
        {children}
        <span
          className={`ml-2 text-lg transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className={`absolute left-0 right-0 mt-2 z-10 transform origin-top transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul
          className={`w-full p-2 bg-white dark:bg-background list-none rounded-lg 
          shadow-lg overflow-hidden max-h-64
          overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
          border border-gray-100 dark:border-gray-700
          backdrop-filter backdrop-blur-sm bg-opacity-98 dark:bg-opacity-98`}
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2.5
                transition-all duration-200 text-gray-700 dark:text-gray-200
                hover:bg-gray-50 dark:hover:bg-foreground hover:text-gray-900 dark:hover:text-background
                cursor-pointer rounded-md my-1 flex items-center gap-2"
                onClick={() => handleItemClick(item)}
              >
                {item.label || item}
              </li>
            ))
          ) : (
            <li className="text-gray-500 dark:text-gray-400 px-4 py-2.5 italic text-center">
              No items available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
