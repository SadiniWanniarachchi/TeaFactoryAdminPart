import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { HiOutlineChartBar } from "react-icons/hi";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowNotifications(false);
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center mt-9">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full shadow-sm w-full max-w-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-700 w-full"
          />
        </div>

        {/* Notification and Profile Section */}
        <div className="flex items-center space-x-6 relative">
          {/* Notification Bell */}
          <div
            className="relative cursor-pointer"
            ref={notificationRef}
          >
            <FaBell
              className="text-green-900 text-2xl hover:text-gray-800 transition"
              onClick={toggleNotifications}
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                <div className="p-4 text-gray-800 font-medium border-b">
                  Notifications
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="p-4 flex items-center text-sm hover:bg-gray-100">
                    <MdOutlineAddShoppingCart className="text-blue-500 text-lg mr-3" />
                    <span>New order received.</span>
                  </li>
                  <li className="p-4 flex items-center text-sm hover:bg-gray-100">
                    <AiOutlineWarning className="text-yellow-500 text-lg mr-3" />
                    <span>Product stock is low.</span>
                  </li>
                  <li className="p-4 flex items-center text-sm hover:bg-gray-100">
                    <HiOutlineChartBar className="text-green-500 text-lg mr-3" />
                    <span>Sales report is ready.</span>
                  </li>
                </ul>
                <div className="p-4 text-sm text-center text-blue-600 cursor-pointer hover:underline">
                  View all notifications
                </div>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div
            className="relative flex items-center space-x-3"
            ref={dropdownRef}
          >
            <FaUserCircle className="text-green-900 text-3xl cursor-pointer" />
            <div
              className="flex items-center cursor-pointer space-x-1"
              onClick={toggleDropdown}
            >
              <span className="text-gray-700 font-medium hidden sm:inline">
                Admin
              </span>
              <FiChevronDown className="text-gray-500" />
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-24 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                <ul className="divide-y divide-gray-200">
                  <li
                    className="p-4 flex items-center text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Logging out...")}
                  >
                    <FiLogOut className="text-gray-500 mr-3" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
