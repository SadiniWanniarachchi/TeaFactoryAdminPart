import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import { FaSearch, FaBell, FaUserCircle, FaEye, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { FaUsers, FaBoxes, FaMapMarkerAlt } from 'react-icons/fa';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Amal Abesinghe", supplierID: "S0023", location: "Nuwara Eliya", status: "Active", orders: 120 },
    { id: 2, name: "Wimal Perera", supplierID: "S0098", location: "Riverston", status: "Inactive", orders: 50 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formValues, setFormValues] = useState({ name: '', supplierID: '', location: '', status: '', orders: '' });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle Add/Edit Supplier
  const handleSave = () => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(supplier => supplier.id === editingSupplier.id ? { ...editingSupplier, ...formValues } : supplier));
    } else {
      setSuppliers([...suppliers, { id: Date.now(), ...formValues }]);
    }
    setShowModal(false);
    setEditingSupplier(null);
    setFormValues({ name: '', supplierID: '', location: '', status: '', orders: '' });
  };

  // Handle Edit Button
  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormValues(supplier);
    setShowModal(true);
  };

  // Handle Delete Button
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5]">
          <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-sm w-full max-w-md">
                <FaSearch className="text-gray-400 mr-2" />
                <input type="text" placeholder="Search suppliers..." className="bg-transparent outline-none text-gray-700 w-full" />
              </div>
              <div className="flex items-center space-x-6">
                <div className="relative cursor-pointer">
                  <FaBell className="text-gray-500 text-2xl hover:text-gray-800 transition" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="text-gray-500 text-3xl cursor-pointer" />
                  <span className="text-gray-700 font-medium hidden sm:inline">Admin</span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex justify-end px-6 mt-7">
            <button
              className="bg-[#21501a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#2d921e] transition-transform hover:scale-105 flex items-center"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="mr-2" /> Add Supplier
            </button>
          </div>

          <div className="container mx-auto px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Active Suppliers</h3>
                  <p className="text-2xl font-bold">{suppliers.filter(s => s.status === 'Active').length}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaUsers className="text-blue-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Total Orders</h3>
                  <p className="text-2xl font-bold">{suppliers.reduce((acc, cur) => acc + cur.orders, 0)}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <FaBoxes className="text-[#21501a] text-2xl" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Suppliers by Region</h3>
                  <p className="text-2xl font-bold">5 Regions</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <FaMapMarkerAlt className="text-yellow-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 mt-10 rounded-lg shadow-md">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Supplier Name</th>
                    <th className="p-3 text-left">SupplierID</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Orders</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{supplier.name}</td>
                      <td className="p-3">{supplier.supplierID}</td>
                      <td className="p-3">{supplier.location}</td>
                      <td className="p-3">{supplier.status}</td>
                      <td className="p-3">{supplier.orders}</td>
                      <td className="p-3 flex space-x-2">
                        <button onClick={() => handleEdit(supplier)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(supplier.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">{editingSupplier ? "Edit Supplier" : "Add Supplier"}</h3>
                <input type="text" name="name" value={formValues.name} onChange={handleChange} placeholder="Supplier Name" className="w-full mb-3 p-2 border rounded" />
                <input type="text" name="supplierID" value={formValues.supplierID} onChange={handleChange} placeholder="Supplier ID" className="w-full mb-3 p-2 border rounded" />
                <input type="text" name="location" value={formValues.location} onChange={handleChange} placeholder="Location" className="w-full mb-3 p-2 border rounded" />
                <input type="text" name="status" value={formValues.status} onChange={handleChange} placeholder="Status" className="w-full mb-3 p-2 border rounded" />
                <input type="number" name="orders" value={formValues.orders} onChange={handleChange} placeholder="Orders" className="w-full mb-3 p-2 border rounded" />
                <div className="flex justify-end space-x-3">
                  <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
                  <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Supplier;
