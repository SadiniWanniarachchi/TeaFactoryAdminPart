import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const QualityManagement = () => {
  // Sample Quality Check Data
  const initialQualityChecks = [
    { id: 1, batchNumber: 'GT001', inspectionDate: '2025-01-10', status: 'Passed' },
    { id: 2, batchNumber: 'BT002', inspectionDate: '2025-01-11', status: 'Failed' },
  ];

  const [qualityChecks, setQualityChecks] = useState(initialQualityChecks);
  const [formData, setFormData] = useState({ batchNumber: '', inspectionDate: '', status: 'Passed' });
  const [editingId, setEditingId] = useState(null);

  // Get Today's Date in YYYY-MM-DD Format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing record
      setQualityChecks(
        qualityChecks.map((check) =>
          check.id === editingId ? { ...formData, id: editingId } : check
        )
      );
      setEditingId(null);
    } else {
      // Add new record
      setQualityChecks([...qualityChecks, { ...formData, id: Date.now() }]);
    }
    setFormData({ batchNumber: '', inspectionDate: '', status: 'Passed' });
  };

  // Handle Edit
  const handleEdit = (id) => {
    const checkToEdit = qualityChecks.find((check) => check.id === id);
    setFormData(checkToEdit);
    setEditingId(id);
  };

  // Handle Delete
  const handleDelete = (id) => {
    setQualityChecks(qualityChecks.filter((check) => check.id !== id));
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <div className="p-6 space-y-6 bg-gray-50 flex-1">
         

          {/* Quality Check Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {editingId ? 'Edit Quality Check' : 'Add Quality Check'}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Inspection Date</label>
                <input
                  type="date"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  min={getTodayDate()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-[#21501a] text-white px-4 py-2 rounded-md hover:bg-[#2d921e]"
              >
                {editingId ? 'Update' : 'Add'} Quality Check
              </button>
            </form>
          </div>

          {/* Quality Check List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Quality Check Records</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Batch Number</th>
                  <th className="border border-gray-300 p-2">Inspection Date</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {qualityChecks.map((check) => (
                  <tr key={check.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{check.batchNumber}</td>
                    <td className="border border-gray-300 p-2">{check.inspectionDate}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        check.status === 'Passed' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {check.status === 'Passed' ? (
                        <FaCheckCircle className="inline-block mr-1" />
                      ) : (
                        <FaTimesCircle className="inline-block mr-1" />
                      )}
                      {check.status}
                    </td>
                    <td className="border border-gray-300 p-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(check.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(check.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityManagement;
