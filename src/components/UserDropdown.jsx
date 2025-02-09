import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

const UserDropdown = ({ user }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Create a reference for the dropdown

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Logout function
    const logoutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    // Navigate to Profile Page
    const navigateToProfile = () => {
        navigate("/ProfilePage");
        setDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* User Profile and Dropdown Toggle */}
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <FaUserCircle className="w-8 h-8 text-green-900" />
                <span className="text-green-900 font-bold">{user?.name}</span>
                <FaCaretDown className={`w-4 h-4 text-green-900 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* Profile Button */}
                    <button
                        onClick={navigateToProfile}
                        className="block w-full text-left px-4 py-2 text-black font-bold hover:bg-gray-200 rounded-lg "
                    >
                        Profile
                    </button>

                    <button
                        onClick={() => {
                            logoutUser();
                            setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-700 font-bold hover:bg-gray-200 rounded-lg "
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
