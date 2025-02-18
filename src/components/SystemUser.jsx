import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";


export const API_URL = "http://localhost:5000/api/user";

const SystemUser = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log("Fetching users from:", API_URL);
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON');
            }

            const data = await response.json();
            console.log("Users fetched:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSave = async () => {
        if (formValues.name && formValues.email) {
            try {
                console.log("Form values being sent:", formValues);

                if (isEditing) {
                    console.log("Updating user with ID:", editId);
                    await axios.put(`${API_URL}/${editId}`, formValues);
                } else {
                    await axios.post(API_URL, formValues);
                }

                await fetchUsers(); // Refresh user data
                setShowModal(false);
                setIsEditing(false);
                setFormValues({ name: "", email: "", password: "" });

            } catch (error) {
                console.error("Error saving user:", error.response ? error.response.data : error.message);
            }
        } else {
            console.error("Error: All fields are required!");
        }
    };




    const handleEdit = (user) => {
        setFormValues(user);
        setEditId(user._id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete user");
            await fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="flex font-kulim min-h-screen">
            <Sidebar activated="systemuser" />
            <div className="flex-1 bg-gray-50">
                <Topbar />
                <div className="p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
                        <button
                            className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-800 transition-all flex items-center"
                            onClick={() => {
                                setShowModal(true);
                                setIsEditing(false);
                                setFormValues({ name: "", email: "", password: "" });
                            }}
                        >
                            <FaPlus className="mr-2" /> Add User
                        </button>
                    </header>

                    {/* User Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Users */}
                        <div className="bg-white shadow-xl rounded-lg border border-gray-200 p-6 flex items-center space-x-4 hover:shadow-md transition-all duration-300">
                            <FaUser className="text-3xl text-green-900" />
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Total Users</p>
                                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* User Table */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-black">Name</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-black">Email</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-all">
                                        <td className="px-6 py-4 text-base text-gray-800">{user.name}</td>
                                        <td className="px-6 py-4 text-base text-gray-800">{user.email}</td>

                                        <td className="px-6 py-4 flex justify-start space-x-3">
                                            <button
                                                className="text-blue-900 p-2 rounded-md transition duration-200"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <FaEdit className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-red-900 p-2 rounded-md transition duration-200"
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

                    {/* Modal for Add/Edit User */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit User" : "Add User"}</h2>
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-900"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-900"
                                />


                                <div className="flex justify-end space-x-3">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all"
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
        </div >
    );
};

export default SystemUser;