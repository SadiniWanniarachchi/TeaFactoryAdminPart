import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaUsers, FaIndustry, FaBox, FaCheckCircle, FaChartLine, FaQuestionCircle, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#21501a] text-white flex flex-col h-screen sticky top-0 shadow-lg">
      {/* Dashboard Title */}
      <Link
        to="/dashboard"
        className="text-2xl font-bold text-center py-5 border-b border-white hover:text-[#2d921e] transition-all duration-300"
      >
        Dashboard
      </Link>

      <nav className="flex flex-col space-y-4 px-3 mt-4 overflow-y-auto">
        {/* Sidebar Links */}
        <Link
          to="/employee"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaUsers className="text-xl" />
          <span>Employee Management</span>
        </Link>

        <Link
          to="/supplier"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaIndustry className="text-xl" />
          <span>Supplier Management</span>
        </Link>

        <Link
          to="/inventory"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaBox className="text-xl" />
          <span>Inventory Management</span>
        </Link>

        <Link
          to="/qa"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaCheckCircle className="text-xl" />
          <span>Quality Management</span>
        </Link>

        <Link
          to="/sales"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaChartLine className="text-xl" />
          <span>Sales Management</span>
        </Link>

        <Link
          to="/help"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaQuestionCircle className="text-xl" />
          <span>Help</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center space-x-3 text-lg hover:bg-[#2d921e] p-4 rounded-lg transition-all duration-300"
        >
          <FaCog className="text-xl" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
