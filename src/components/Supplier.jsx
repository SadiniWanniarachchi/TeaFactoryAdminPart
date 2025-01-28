import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"; // For charts
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react"; // For cards (optional)

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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <TopBar />
        <div className="p-6">
          <header className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Supplier Dashboard</h1>
            <button
              className="bg-[#21501a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#2d921e]"
              onClick={() => { setShowModal(true); setIsEditing(false); setFormValues({ name: "", supplierID: "", location: "", status: "", orders: "" }); }}
            >
              Add Supplier
            </button>
          </header>

          {/* Informational Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader className="bg-[#21501a] text-white p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Total Suppliers</h2>
              </CardHeader>
              <CardBody className="p-4">
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader className="bg-[#21501a] text-white p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Active Suppliers</h2>
              </CardHeader>
              <CardBody className="p-4">
                <p className="text-2xl font-bold">
                  {suppliers.filter((supplier) => supplier.status === "Active").length}
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader className="bg-[#21501a] text-white p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Total Orders</h2>
              </CardHeader>
              <CardBody className="p-4">
                <p className="text-2xl font-bold">
                  {suppliers.reduce((acc, supplier) => acc + parseInt(supplier.orders || 0), 0)}
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Supplier Orders Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#21501a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Supplier Table */}
          <div className="mt-6">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Name</th>
                  <th className="p-3">Supplier ID</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Orders</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier._id} className="border-t">
                    <td className="p-3">{supplier.name}</td>
                    <td className="p-3">{supplier.supplierID}</td>
                    <td className="p-3">{supplier.location}</td>
                    <td className="p-3">{supplier.status}</td>
                    <td className="p-3">{supplier.orders}</td>
                    <td className="p-3 px-7 flex space-x-2">
                      <button className="text-blue-500 p-2" onClick={() => handleEdit(supplier)}><FaEdit /></button>
                      <button className="text-red-500 p-2" onClick={() => handleDelete(supplier._id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal (unchanged) */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Supplier" : "Add Supplier"}</h2>
              <input type="text" name="name" value={formValues.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-3 p-2 border rounded" />
              <input type="text" name="supplierID" value={formValues.supplierID} onChange={handleInputChange} placeholder="Supplier ID" className="w-full mb-3 p-2 border rounded" />
              <input type="text" name="location" value={formValues.location} onChange={handleInputChange} placeholder="Location" className="w-full mb-3 p-2 border rounded" />
              <input type="text" name="status" value={formValues.status} onChange={handleInputChange} placeholder="Status" className="w-full mb-3 p-2 border rounded" />
              <input type="number" name="orders" value={formValues.orders} onChange={handleInputChange} placeholder="Orders" className="w-full mb-3 p-2 border rounded" />
              <div className="flex justify-between">
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;