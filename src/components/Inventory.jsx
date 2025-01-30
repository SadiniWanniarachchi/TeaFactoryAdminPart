import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaBox, FaChartBar, FaClipboardList, FaExclamationTriangle, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Inventory = () => {
  // State Management
  const [inventoryData, setInventoryData] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', stock: '', threshold: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch inventory data from the backend
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventoryData(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  // Pie Chart Data
  const pieChartData = {
    labels: inventoryData.map((item) => item.name),
    datasets: [
      {
        data: inventoryData.map((item) => item.stock),
        backgroundColor: [
          '#6A994E', // Tea Leaf Green
          '#A7C957', // Lime Green
          '#386641', // Dark Forest Green
          '#BFD200', // Bright Yellow-Green
          '#D4E157', // Light Olive Green
        ],
        hoverBackgroundColor: [
          '#558647', // Darker Tea Leaf Green
          '#94B845', // Darker Lime Green
          '#2F5734', // Darker Forest Green
          '#A5B200', // Darker Bright Yellow-Green
          '#BFD64B', // Darker Light Olive Green
        ],
      },
    ],
  };

  // Low Stock Items
  const lowStockItems = inventoryData.filter((item) => item.stock < item.threshold);

  // CRUD Operations
  const handleAddItem = () => {
    setNewItem({ id: '', name: '', stock: '', threshold: '' });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSaveItem = async () => {
    if (newItem.name && newItem.stock && newItem.threshold) {
      try {
        if (isEditing) {
          // Update existing item
          await axios.put(`http://localhost:5000/api/inventory/${newItem._id}`, newItem);
        } else {
          // Add new item
          await axios.post('http://localhost:5000/api/inventory', newItem);
        }
        fetchInventoryData(); // Refresh data after adding/updating
        setShowModal(false);
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  };

  const handleEditItem = (id) => {
    const itemToEdit = inventoryData.find((item) => item._id === id);
    setNewItem(itemToEdit);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/inventory/${id}`);
        fetchInventoryData(); // Refresh data after deletion
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Dashboard Content */}
        <div className="p-6 space-y-6 bg-gray-50 flex-1 overflow-y-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h1>
            <button
              className="flex items-center px-4 py-2 bg-[#21501a] hover:bg-[#2d921e] text-white rounded-md shadow-md"
              onClick={handleAddItem}
            >
             Add Item
            </button>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <FaBox className="text-[#21501a] text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-medium text-gray-700">Total Products</h2>
                <p className="text-2xl font-bold">{inventoryData.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <FaClipboardList className="text-blue-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-medium text-gray-700">Total Stock</h2>
                <p className="text-2xl font-bold">
                  {inventoryData.reduce((sum, item) => sum + item.stock, 0)} units
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <FaExclamationTriangle className="text-red-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-medium text-gray-700">Low Stock Items</h2>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
              </div>
            </div>
          </div>

          {/* Inventory Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-black" /> Inventory Distribution
              </h2>
              <div className="h-64">
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FaClipboardList className="mr-2 text-black" /> Inventory Details
              </h2>
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Product Name</th>
                    <th className="border border-gray-300 p-2">Stock</th>
                    <th className="border border-gray-300 p-2">Threshold</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">{item.name}</td>
                      <td className="border border-gray-300 p-2">{item.stock}</td>
                      <td className="border border-gray-300 p-2">{item.threshold}</td>
                      <td className="border border-gray-300 py-4 px-7 flex space-x-7">
                        <button
                          className="text-blue-500"
                          onClick={() => handleEditItem(item._id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Add/Edit Item */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Item' : 'Add Item'}</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Threshold"
                    value={newItem.threshold}
                    onChange={(e) => setNewItem({ ...newItem, threshold: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-md"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-[#21501a] text-white rounded-md"
                      onClick={handleSaveItem}
                    >
                      {isEditing ? 'Update' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;