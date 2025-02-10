import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown, FaBell, FaSearch } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { HiOutlineChartBar } from "react-icons/hi";

const Topbar = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  // Toggle Notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowDropdown(false); // Close user dropdown when notifications open
  };

  // Toggle User Dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowNotifications(false); // Close notifications when user dropdown opens
  };

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);


  // Logout Function
  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Navigate to Profile Page
  const navigateToProfile = () => {
    navigate("/ProfilePage");
    setShowDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white sticky top-0 z-10 font-kulim shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
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
          {/* Notifications Bell */}
          <div className="relative cursor-pointer" ref={notificationRef}>
            <FaBell
              className="text-green-900 text-2xl hover:text-gray-800 transition"
              onClick={toggleNotifications}
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 transform translate-x-1/2 -translate-y-1/2">
              3
            </span>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                <div className="p-4 text-gray-800 font-medium border-b">Notifications</div>
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

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUserCircle className="w-8 h-8 text-green-900" />
              <span className="text-green-900 font-bold">{currentUser?.name || "Guest"}</span>

              <FaCaretDown className={`w-4 h-4 text-green-900 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button
                  onClick={navigateToProfile}
                  className="block w-full text-left px-4 py-2 text-black font-bold hover:bg-gray-200 rounded-lg"
                >
                  Profile
                </button>
                <button
                  onClick={logoutUser}
                  className="block w-full text-left px-4 py-2 text-red-700 font-bold hover:bg-gray-200 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
