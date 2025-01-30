import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import Sidebar from './Sidebar'; // Replace with the actual path to your Sidebar component
import Topbar from './Topbar';   // Replace with the actual path to your Topbar component

const Sales = () => {
  const [sales, setSales] = useState([
    { id: 1, product: 'Green Tea', quantity: 20, amount: 200, date: '2025-01-01' },
    { id: 2, product: 'Black Tea', quantity: 15, amount: 150, date: '2025-01-05' },
    { id: 3, product: 'Herbal Tea', quantity: 10, amount: 100, date: '2025-01-10' },
  ]);

  const [formState, setFormState] = useState({ product: '', quantity: '', amount: '', date: '' });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!formState.product || formState.quantity <= 0 || formState.amount <= 0 || !formState.date) {
      alert('Please enter valid product details. Quantity, amount, and date are required.');
      return;
    }

    if (editing) {
      setSales(
        sales.map((sale) =>
          sale.id === editId ? { ...sale, ...formState, id: editId } : sale
        )
      );
      setEditing(false);
      setEditId(null);
    } else {
      setSales([...sales, { id: Date.now(), ...formState }]);
    }
    setFormState({ product: '', quantity: '', amount: '', date: '' });
  };

  const handleEdit = (id) => {
    const sale = sales.find((sale) => sale.id === id);
    setFormState({
      product: sale.product,
      quantity: sale.quantity,
      amount: sale.amount,
      date: sale.date,
    });
    setEditing(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setSales(sales.filter((sale) => sale.id !== id));
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
                    key={sale.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{sale.product}</td>
                    <td className="py-3 px-6">{sale.quantity}</td>
                    <td className="py-3 px-6">${sale.amount}</td>
                    <td className="py-3 px-6">{sale.date}</td>
                    <td className="py-3 px-6 flex space-x-3">
                      <button
                        onClick={() => handleEdit(sale.id)}
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        <FaEdit className="mr-2" />
                      </button>
                      <button
                        onClick={() => handleDelete(sale.id)}
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
