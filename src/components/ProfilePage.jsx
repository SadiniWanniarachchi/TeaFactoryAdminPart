import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const QualityManagement = () => {
    const [qualityChecks, setQualityChecks] = useState([]);
    const [formData, setFormData] = useState({ batchNumber: '', inspectionDate: '', status: 'Passed' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchQualityChecks();
    }, []);

    const fetchQualityChecks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/qualitychecks');
            const data = await response.json();
            setQualityChecks(data);
        } catch (err) {
            console.error('Error fetching quality checks:', err);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validate Batch Number: Only allow capital letters (A-Z) and numbers (0-9)
        if (name === 'batchNumber' && !/^[A-Z0-9]*$/.test(value)) {
            alert('Batch Number can only contain capital letters (A-Z) and numbers (0-9).');
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Final validation before submitting
        if (!/^[A-Z0-9]+$/.test(formData.batchNumber)) {
            alert('Invalid Batch Number! It must contain only capital letters (A-Z) and numbers (0-9).');
            return;
        }

        try {
            if (editingId) {
                await fetch(`http://localhost:5000/api/qualitychecks/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                setEditingId(null);
            } else {
                await fetch('http://localhost:5000/api/qualitychecks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ batchNumber: '', inspectionDate: '', status: 'Passed' });
            fetchQualityChecks();
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    const handleEdit = (id) => {
        const checkToEdit = qualityChecks.find((check) => check._id === id);
        setFormData(checkToEdit);
        setEditingId(id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/qualitychecks/${id}`, {
                method: 'DELETE',
            });
            fetchQualityChecks();
        } catch (err) {
            console.error('Error deleting quality check:', err);
        }
    };

    return (
        <div className="flex bg-white font-kulim">
            <Sidebar activated="qa" />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <div className="p-6 space-y-6 bg-white flex-1 font-kulim">
                    <header className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-8">Quality Checking Dashboard</h1>
                    </header>

                    <div className="bg-white p-6 rounded-lg shadow-2xl">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            {editingId ? 'Edit Quality Check' : 'Add Quality Check'}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                                <input
                                    type="text"
                                    name="batchNumber"
                                    placeholder="Batch Number"
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
                                    placeholder="Inspection Date"
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
                                className="bg-green-900 text-white px-3 py-3 mt-10 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center"
                            >
                                {editingId ? 'Update' : 'Add'} Quality Check
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-black mb-4">Quality Check Records</h2>
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
                                    <tr key={check._id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 p-2 text-center">{check.batchNumber}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            {new Date(check.inspectionDate).toLocaleDateString()}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-2 text-center ${check.status === 'Passed' ? 'text-green-900' : 'text-red-900'
                                                }`}
                                        >
                                            {check.status === 'Passed' ? <FaCheckCircle className="inline-block mr-1" /> : <FaTimesCircle className="inline-block mr-1" />}
                                            {check.status}
                                        </td>
                                        <td className="border border-gray-300 p-2 flex space-x-10 text-center">
                                            <button onClick={() => handleEdit(check._id)} className="text-blue-800">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(check._id)} className="text-red-900">
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
