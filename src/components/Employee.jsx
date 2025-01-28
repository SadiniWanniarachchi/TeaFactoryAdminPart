import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaUserCircle, FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const API_URL = "http://localhost:5000/api/Employee";

const Employee = () => {
  // State Management
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState({ name: "", empid: "", role: "", contact: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch Employees on Mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Employee Edit
  const handleEdit = (id) => {
    const employeeToEdit = employees.find(emp => emp.id === id);
    if (employeeToEdit) {
      setFormState({
        name: employeeToEdit.name,
        empid: employeeToEdit.empid,
        role: employeeToEdit.role,
        contact: employeeToEdit.contact
      });
      setEditId(id);
      setIsEditing(true);
      setIsModalOpen(true);
    }
  };

  // Handle Save (Add / Update Employee)
  const handleSave = async () => {
    if (isEditing) {
      try {
        const response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          throw new Error("Failed to update employee");
        }

        await fetchEmployees(); // Refresh list
        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    } else {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          throw new Error("Failed to add employee");
        }

        await fetchEmployees(); // Refresh list
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
    setFormState({ name: "", empid: "", role: "", contact: "" });
    setIsModalOpen(false);
  };

  // Filter Employees
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        {/* Use the Topbar Component */}
        <Topbar />

        <div className="p-6 space-y-6 bg-gray-50 flex-1 overflow-y-auto">
          <header className="flex justify-between items-center bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
          <button
            className="bg-[#21501a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#2d921e] transition-transform hover:scale-105 flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2" /> Add Employee
          </button>
        </header>
          
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
              >
                <FaUserCircle className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 text-center">{employee.name}</h2>
                <p className="text-gray-600 text-center">{employee.empid}</p>
                <p className="text-gray-600 text-center">{employee.role}</p>
                <p className="text-gray-500 text-center mb-4">{employee.contact}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">{isEditing ? "Edit Employee" : "Add Employee"}</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Employee ID"
                name="empid"
                value={formState.empid}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Role"
                name="role"
                value={formState.role}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Contact"
                name="contact"
                value={formState.contact}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;  