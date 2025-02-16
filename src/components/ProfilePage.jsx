import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEdit, FaHistory, FaCalendarAlt, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData._id;

    useEffect(() => {
        if (userData && userData.id) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/user/user/${userData.id}`);
                    setUser({
                        name: response.data.name,
                        email: response.data.email,
                        password: "",
                    });
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            fetchUserDetails();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); // Corrected syntax
        // Clear errors when the user starts typing
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = { name: "", email: "", password: "" };
        let isValid = true;

        // Name validation
        if (!user.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        // Email validation
        if (!user.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        // Password validation (only if password is being changed)
        if (passwordChanged && !user.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (passwordChanged && user.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return; // Stop if validation fails
        }

        try {
            // Create payload without password if unchanged
            const payload = {
                name: user.name,
                email: user.email,
                // Only include password if it's changed and not empty
                ...(user.password !== "" && { password: user.password }),
            };

            console.log(payload);

            await axios.put(`http://localhost:5000/api/user/user/${userData.id}`, payload);
            setIsEditing(false);
            navigate("../Login");
        } catch (error) {
            console.error("Error saving user details:", error);
        }
    };

    const handleDelete = async () => {
        try {
            // Delete the user account from the backend
            await axios.delete(`http://localhost:5000/api/user/${userData.id}`);
            localStorage.removeItem("user");
            window.location.href = "/Login"; // Redirect to homepage or login page after deletion
        } catch (error) {
            console.error("Error deleting user account:", error);
        }
    };



    return (

        <div className="flex font-kulim">
            <Sidebar activated="sale" />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <section
                    className="relative h-48 bg-cover bg-center bg-no-repeat"

                >
                    <div className="absolute inset-0 flex items-center justify-center text-green-900">
                        <motion.h1
                            className="text-5xl font-extrabold text-shadow-md"
                            animate={{ opacity: [0, 1], y: [50, 0] }}
                            transition={{ duration: 1 }}
                        >
                            My Profile
                        </motion.h1>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto py-5 px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-3xl font-bold text-green-900 flex items-center">
                                    <FaUser className="mr-2" /> Personal Information
                                </h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="bg-green-900 text-white py-2 px-4 rounded-full hover:bg-[#183d14] transition duration-300 flex items-center"
                                >
                                    <FaEdit className="mr-2" /> {isEditing ? "Cancel" : "Edit"}
                                </button>
                            </div>

                            {isEditing ? (
                                <form>
                                    <div className="space-y-4">
                                        {/* Name Field */}
                                        <div>
                                            <label className="block text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={user.name}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label className="block text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Password Field */}
                                        <div>
                                            <label className="block text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={passwordChanged ? user.password : ""}
                                                onChange={(e) => {
                                                    setUser({ ...user, password: e.target.value });
                                                    setPasswordChanged(true);
                                                }}
                                                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                            />
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                        </div>

                                        {/* Save Changes Button */}
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            className="bg-green-900 text-white py-2 px-4 rounded-full transition duration-300"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Password:</strong> ********</p>
                                </div>
                            )}
                        </div>

                        {/* Replacing the Favorites section with Upcoming Events */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold text-green-900 mb-6 flex items-center">
                                <FaCalendarAlt className="mr-2" /> Upcoming Events
                            </h2>
                            <ul className="space-y-4">
                                <li className="text-gray-700">New Collection Launch - 2025-03-01</li>
                                <li className="text-gray-700">Exclusive Webinar - 2025-03-10</li>
                                <li className="text-gray-700">Seasonal Sale - 2025-04-01</li>
                            </ul>
                        </div>
                    </div>



                    {/* Delete Account Button */}
                    <div className="mt-11 text-center">
                        <button
                            onClick={handleDelete}
                            className="bg-red-900 text-white py-2 px-8 rounded-full transition duration-300 flex items-center justify-center"
                        >
                            <FaTrash className="mr-2" /> {/* Adjusted margin */}
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default ProfilePage;