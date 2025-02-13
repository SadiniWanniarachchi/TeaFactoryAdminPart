import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaUser, FaUserCheck, FaUserTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export const API_URL = "http://localhost:5000/api/user/user";


const SystemUser = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        status: "Active",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            // Optionally set an error state
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Handle form submission (add or update user)
    const handleSave = async () => {
        try {
            const method = isEditing ? "PUT" : "POST";
            const url = isEditing ? `${API_URL}/${editId}` : API_URL;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Failed to save user");
            }

            await fetchUsers();
            setShowModal(false);
            setIsEditing(false);
            setFormValues({ name: "", email: "", status: "Active" });
        } catch (error) {

        }
    };


    // Handle editing a user
    const handleEdit = (user) => {
        setFormValues(user);
        setEditId(user._id);
        setIsEditing(true);
        setShowModal(true);
    };

    // Handle deleting a user
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete user");
            await fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="flex font-kulim">
            <Sidebar activated="systemuser" />
            <div className="flex-1 bg-white">
                <Topbar />
                <div className="p-6">
                    <header className="flex justify-between items-center mt-6">
                        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                        <button
                            className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center"
                            onClick={() => {
                                setShowModal(true);
                                setIsEditing(false);
                                setFormValues({ name: "", email: "", status: "Active" });
                                setFormValues({ name: "", email: "", status: "Active" });
                            }}
                        >
                            <FaPlus className="mr-2" /> Add User
                        </button>
                    </header>

                    {/* User Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 mb-10">
                        {/* Total Users */}
                        <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
                            <FaUser className="text-3xl text-green-900" />
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Total Users</p>
                                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                            </div>
                        </div>

                        {/* Active Users */}
                        <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
                            <FaUserCheck className="text-3xl text-green-900" />
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Active Users</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {users.filter((user) => user.status === "Active").length}
                                </p>
                            </div>
                        </div>

                        {/* Inactive Users */}
                        <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
                            <FaUserTimes className="text-3xl text-red-900" />
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Inactive Users</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {users.filter((user) => user.status === "Inactive").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-3 text-left text-sm font-bold text-black">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-black">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-black">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 py-4 text-sm text-gray-800">{user.name}</td>
                                        <td className="px-4 py-4 text-sm text-gray-800">{user.email}</td>
                                        <td className="px-4 py-4 text-sm text-gray-800">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === "Active"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 flex justify-start space-x-3">
                                            <button
                                                className="text-blue-700 p-2 rounded-md transition duration-200"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <FaEdit className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-red-800 p-2 rounded-md transition duration-200"
                                                onClick={() => handleDelete(user._id)}
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

                {/* Modal for Add/Edit User */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-96">
                            <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit User" : "Add User"}</h2>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full mb-3 p-2 border rounded"
                            />
                            <select
                                name="status"
                                value={formValues.status}
                                onChange={handleInputChange}
                                className="w-full mb-3 p-2 border rounded"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <div className="flex justify-between">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-green-900 text-white px-4 py-2 rounded"
                                    onClick={handleSave}
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

export default SystemUser;