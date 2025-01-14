import React from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Topbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-sm w-full max-w-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-700 w-full"
          />
        </div>

        {/* Notification and Profile Section */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative cursor-pointer">
            <FaBell className="text-gray-500 text-2xl hover:text-gray-800 transition" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-gray-500 text-3xl cursor-pointer" />
            <span className="text-gray-700 font-medium hidden sm:inline">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
