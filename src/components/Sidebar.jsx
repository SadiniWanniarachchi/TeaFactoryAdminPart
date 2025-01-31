import { Link } from "react-router-dom";
import { FaUsers, FaTruck, FaKey, FaPlusCircle, FaQuestionCircle } from 'react-icons/fa';
import { LiaCoinsSolid } from "react-icons/lia";
import { FaCartFlatbed } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import { BsPersonFillUp } from "react-icons/bs";
import { FaBasketShopping } from "react-icons/fa6";
import { MdHelp } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="w-80 bg-[#c2c9b6] p-4 flex flex-col h-screen sticky top-0 font-kulim">
       <Link
        to="/dashboard"
        className="text-3xl font-bold text-center pt-9 pb-16 transition-all duration-300"
      >Dashboard</Link>
     
      <nav className="flex flex-col gap-4">
        <Link to="/employee" className="flex text-xl pb-3  items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
          <FaUsers className="text-green-900"/> Employee Management
        </Link>
        <Link to="/supplier" className="flex text-xl pb-3 items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
          <BsPersonFillUp className="text-green-900"/> Supplier Management
        </Link>
        <Link to="/inventory" className="flex text-xl pb-3 items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
          <FaCartFlatbed className="text-green-900"/> Inventory Management
        </Link>
        <Link to="/qa" className="flex text-xl pb-3 items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
          < PiCertificateFill className="text-green-900"/> Quality Management
        </Link>
        <Link to="/sales" className="flex text-xl pb-3 items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
          <LiaCoinsSolid className="text-green-900"/> Sales Management
        </Link>
        <Link to="/addproduct" className="flex text-xl items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
          <FaBasketShopping className="text-green-900"/> Add Product
        </Link>
      </nav>
      <div className="mt-auto flex text-xl items-center gap-5 px-4 py-2 font-semibold text-black hover:bg-[#ffffff] p-3 rounded-md transition-all duration-300">
        <Link to="/help" className="flex items-center gap-2">
          <MdHelp className="text-green-900"/> Help
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
