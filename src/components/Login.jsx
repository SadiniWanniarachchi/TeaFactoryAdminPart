import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import teaBackground from "../assets/field.jpg";

const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Add authentication logic here if needed
    navigate("/dashboard"); // Navigate to the Dashboard
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${teaBackground})` }}
    >
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-[#21501a]">Welcome Back!</h1>
        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#21501a] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-black">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#21501a] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#21501a] text-white font-bold rounded-md hover:bg-[#1a3e10] transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-black mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#21501a] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
