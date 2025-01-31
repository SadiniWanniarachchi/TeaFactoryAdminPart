import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaUserCircle, FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const API_URL = "http://localhost:5000/api/Employee";

const Employee = () => {
  // State Management
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    empid: "",
    role: "",
    contact: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch Employees on Mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data); // Ensure data has unique `id` fields
      console.log("Employees fetched:", data); // Debugging
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
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
    console.log("Editing ID:", id); // Debugging
    const employeeToEdit = employees.find((emp) => emp._id === id);
    console.log("Employee to Edit:", employeeToEdit); // Debugging
    if (employeeToEdit) {
      setFormState({
        name: employeeToEdit.name || "",
        empid: employeeToEdit.empid || "",
        role: employeeToEdit.role || "",
        contact: employeeToEdit.contact || "",
      });
      setEditId(id); // Set ID of the employee being edited
      setIsEditing(true); // Switch to editing mode
      setIsModalOpen(true); // Open modal
    } else {
      console.error(`Employee with ID ${id} not found.`);
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

        await fetchEmployees();
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

        await fetchEmployees();
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }

    setFormState({ name: "", empid: "", role: "", contact: "" });
    setIsModalOpen(false);
  };

  // Handle Employee Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Filter Employees
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-white">
        <Topbar />

        <div className="p-6 space-y bg-white flex-1 overflow-y-auto">
          <header className="flex justify-between items-center bg-white mt-5 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Employee Dashboard
            </h1>
            <button
              className="bg-[#21501a] text-white px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center"
              onClick={() => {
                setFormState({ name: "", empid: "", role: "", contact: "" });
                setIsEditing(false);
                setIsModalOpen(true);
              }}
            >
             Add Employee
            </button>
          </header>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="bg-gray-100 shadow-xl rounded-lg p-6 transition duration-300"
              >
                <FaUserCircle className="w-20 h-20 text-green-900 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {employee.name}
                </h2>
                <p className="text-gray-600 text-center">{employee.empid}</p>
                <p className="text-gray-600 text-center">{employee.role}</p>
                <p className="text-gray-500 text-center mb-4">
                  {employee.contact}
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
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
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {isEditing ? "Edit Employee" : "Add Employee"}
              </h2>
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
                placeholder="Email"
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
