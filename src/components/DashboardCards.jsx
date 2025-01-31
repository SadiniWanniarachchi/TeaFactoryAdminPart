import React from "react";
import { FaLeaf, FaBoxes, FaUsers } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";

const data = [
  { title: "Tea Leaves", value: "1,200 kg", icon: <FaLeaf size={40} className="text-[#21501a]" /> },
  { title: "Processed Packs", value: 453, icon: <FaBoxes size={40} className="text-[#21501a]" /> },
  { title: "Employees", value: 25, icon: <FaUsers size={40} className="text-[#21501a]" /> },
  { title: "Income", value: "$120,000", icon: <TbMoneybag size={40} className="text-[#21501a]" /> },
];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-14">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-xl p-4 rounded-lg flex items-center space-x-4"
        >
          <span>{item.icon}</span>
          <div>
            <p className="text-xl font-bold">{item.value}</p>
            <p className="text-gray-600">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;