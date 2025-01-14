import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing React Icon for user

const NewEmployee = () => {
  const employee = [
    { name: "Vishwa Jayasinghe", empid: "E0987" },
    { name: "Namali Fernando", empid: "E9227" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-bold text-lg text-black mb-6">New Employees</h2>
      <ul>
        {employee.map((employee, index) => (
          <li key={index} className="flex items-center space-x-4 mb-4">
            {/* React Icon for Profile */}
            <FaUserCircle className="text-4xl text-gray-600" />
            <div className="flex-1">
              <span className="font-medium text-lg">{employee.name}</span>
              <br />
              <span className="text-sm text-gray-500 text-bold">{employee.empid}</span>
            </div>
            <button className="bg-[#21501a] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557] transition">
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewEmployee;
