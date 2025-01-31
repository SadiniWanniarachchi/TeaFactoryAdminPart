import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { FaPlus, FaEdit, FaTrash, FaWarehouse, FaBoxOpen } from "react-icons/fa"; // Import icons for cards
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"; // For charts
import { BsPersonFillCheck } from "react-icons/bs";

const API_URL = "http://localhost:5000/api/Supplier";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", supplierID: "", location: "", status: "", orders: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
      return; // Prevents updating state if invalid characters are entered
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_URL}/${editId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) throw new Error("Failed to save supplier");

      await fetchSuppliers();
      setShowModal(false);
      setIsEditing(false);
      setFormValues({ name: "", supplierID: "", location: "", status: "", orders: "" });
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  const handleEdit = (supplier) => {
    setFormValues(supplier);
    setEditId(supplier._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete supplier");
      await fetchSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  // Mock data for the chart (replace with real data from your API)
  const chartData = suppliers.map((supplier) => ({
    name: supplier.name,
    orders: supplier.orders,
  }));

  return (
    <div className="flex font-kulim">
      <Sidebar />
      <div className="flex-1 bg-white">
        <TopBar />
        <div className="p-6">
          <header className="flex justify-between items-center mt-6 font-kulim">
            <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
            <button
              className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center"
              onClick={() => {
                setShowModal(true);
                setIsEditing(false);
                setFormValues({ name: "", supplierID: "", location: "", status: "" });
              }}
            >
              Add Supplier
            </button>
          </header>

          {/* Supplier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 mb-10">
            {/* Total Suppliers */}
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
              <FaWarehouse className="text-3xl text-green-900" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Total Suppliers</p>
                <p className="text-2xl font-bold text-gray-800">{suppliers.length}</p>
              </div>
            </div>

            {/* Active Suppliers */}
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
              <BsPersonFillCheck className="text-4xl text-green-900" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Active Suppliers</p>
                <p className="text-2xl font-bold text-gray-800">
                  {suppliers.filter((supplier) => supplier.status === "Active").length}
                </p>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
              <FaBoxOpen className="text-3xl text-green-900" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">
                  {suppliers.reduce((acc, supplier) => acc + parseInt(supplier.orders || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white shadow-xl rounded-lg p-20 mb-20">
            <h2 className="font-bold text-xl text-black mb-10">Supplier Orders Overview</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} barCategoryGap={30} width={650}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 14 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#4A774A" barSize={50} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Supplier Table */}
          <div className="mt-6 overflow-x-auto">
  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-3 text-left text-sm font-bold text-black">Name</th>
        <th className="px-4 py-3 text-left text-sm font-bold text-black">Supplier ID</th>
        <th className="px-4 py-3 text-left text-sm font-bold text-black">Location</th>
        <th className="px-4 py-3 text-left text-sm font-bold text-black">Status</th>
        <th className="px-4 py-3 text-left text-sm font-bold text-black">Actions</th>
      </tr>
    </thead>
    <tbody>
      {suppliers.map((supplier) => (
        <tr key={supplier._id} className="border-t border-gray-200">
          <td className="px-4 py-4 text-sm text-gray-800">{supplier.name}</td>
          <td className="px-4 py-4 text-sm text-gray-800">{supplier.supplierID}</td>
          <td className="px-4 py-4 text-sm text-gray-800">{supplier.location}</td>
          <td className="px-4 py-4 text-sm text-gray-800">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                supplier.status === "Active"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {supplier.status}
            </span>
          </td>
          <td className="px-4 py-4 flex justify-start space-x-3">
            <button
              className="text-blue-700 p-2 rounded-md transition duration-200"
              onClick={() => handleEdit(supplier)}
            >
              <FaEdit className="w-5 h-5" />
            </button>
            <button
              className="text-red-800 p-2 rounded-md transition duration-200"
              onClick={() => handleDelete(supplier._id)}
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-96">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Supplier" : "Add Supplier"}</h2>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="supplierID"
                value={formValues.supplierID}
                onChange={handleInputChange}
                placeholder="Supplier ID"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="w-full mb-3 p-2 border rounded"
              />
              <select
                 name="status"
                 value={formValues.status}
                 onChange={handleInputChange}
                 className="w-full mb-3 p-2 border rounded"
              >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              </select>
              
              <div className="flex justify-between">
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="bg-green-900 text-white px-4 py-2 rounded" onClick={handleSave}>
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

export default Supplier;
