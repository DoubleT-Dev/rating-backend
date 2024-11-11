'use client'
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ActionDropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component is mounted
    setIsClient(true);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  if (!isClient) {
    // Prevent rendering of dropdown UI on the server
    return <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell" />;
  }

  return (
    <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell">
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Actions
          <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
        </button>
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10"
            role="menu"
          >
            <div className="py-1">{children}</div>
          </div>
        )}
      </div>
    </td>
  );
};

export default ActionDropdown;
