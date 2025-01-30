import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [formState, setFormState] = useState({ product: '', quantity: '', amount: '', date: '' });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all sales on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  // Fetch sales from the backend
  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000//api/Sale');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission (add or update)
  const handleAddOrUpdate = async () => {
    if (!formState.product || formState.quantity <= 0 || formState.amount <= 0 || !formState.date) {
      alert('Please enter valid product details. Quantity, amount, and date are required.');
      return;
    }
  
    try {
      const url = editing ? `http://localhost:5000/api/sales/${editId}` : 'http://localhost:5000/api/sales';
      const method = editing ? 'PUT' : 'POST';
  
      console.log('Sending request to:', url);
      console.log('Request body:', formState);
  
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Response from server:', result);
  
      if (editing) {
        setSales(sales.map((sale) => (sale._id === editId ? result : sale)));
        setEditing(false);
        setEditId(null);
      } else {
        setSales([...sales, result]);
      }
  
      setFormState({ product: '', quantity: '', amount: '', date: '' });
    } catch (error) {
      console.error('Error saving sale:', error);
      alert('Failed to save sale. Check the console for details.');
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    const sale = sales.find((sale) => sale._id === id);
    setFormState({
      product: sale.product,
      quantity: sale.quantity,
      amount: sale.amount,
      date: sale.date.split('T')[0], // Format date for input field
    });
    setEditing(true);
    setEditId(id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000//api/Sale/${id}`, {
        method: 'DELETE',
      });
      setSales(sales.filter((sale) => sale._id !== id));
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  // Pie chart data
  const pieChartData = {
    labels: sales.map((sale) => sale.product),
    datasets: [
      {
        data: sales.map((sale) => sale.amount),
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 bg-gray-100 flex-1">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Sales Dashboard</h1>
          </header>

          {/* Add/Edit Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {editing ? 'Edit Sale' : 'Add Sale'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product"
                  id="product"
                  placeholder="Enter product name"
                  value={formState.product}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter quantity"
                  value={formState.quantity}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                  min="1"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter amount"
                  value={formState.amount}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                  min="1"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formState.date}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                  min={new Date().toISOString().split('T')[0]} // Restrict to today and beyond
                />
              </div>
            </div>
            <button
              onClick={handleAddOrUpdate}
              className="mt-6 bg-[#21501a] text-white px-6 py-2 rounded-lg hover:bg-[#2d921e]"
            >
              {editing ? 'Update Sale' : 'Add Sale'}
            </button>
          </div>

          {/* Sales List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales List</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6">Product</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-black text-sm font-semibold">
                {sales.map((sale) => (
                  <tr
                    key={sale._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{sale.product}</td>
                    <td className="py-3 px-6">{sale.quantity}</td>
                    <td className="py-3 px-6">${sale.amount}</td>
                    <td className="py-3 px-6">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="py-3 px-6 flex space-x-3">
                      <button
                        onClick={() => handleEdit(sale._id)}
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        <FaEdit className="mr-2" />
                      </button>
                      <button
                        onClick={() => handleDelete(sale._id)}
                        className="text-red-500 hover:underline flex items-center"
                      >
                        <FaTrash className="mr-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Distribution</h2>
            <div className="flex justify-center items-center">
              {/* Small Pie Chart */}
              <div style={{ width: '300px', height: '300px' }}>
                <Pie data={pieChartData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sales;