import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing React Icon for user

const NewEmployee = () => {
  const employee = [
    { name: "Vishwa Jayasinghe", empid: "E0987" },
    { name: "Namali Fernando", empid: "E9227" },
  ];

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 font-kulim">
      <h2 className="font-bold text-lg text-black mb-6">New Employees</h2>
      <ul>
        {employee.map((employee, index) => (
          <li key={index} className="flex items-center space-x-4 mb-4">
            {/* React Icon for Profile */}
            <FaUserCircle className="text-4xl text-green-900" />
            <div className="flex-1">
              <span className="font-medium text-lg">{employee.name}</span>
              <br />
              <span className="text-sm text-gray-500 text-bold">{employee.empid}</span>
            </div>
            <button className="px-4 py-2 border border-gray-400 text-black bg-gray-100 
                       rounded-md transition-all duration-300 ease-in-out
                       hover:bg-black hover:text-white hover:border-black">
                 View
           </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewEmployee;
