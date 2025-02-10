import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Correct imports
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // Add Dashboard component
import Employee from "./components/Employee"; // Add Employee component
import Supplier from "./components/Supplier"; // Add Supplier component
import Inventory from "./components/Inventory"; // Add Inventory component
import QA from "./components/QA"; // Add QA component
import Sales from "./components/Sales"; // Add Sales component
import Help from "./components/Help"; // Add Help component
import Settings from "./components/Settings"; // Add Settings component
import AddProduct from "./components/AddProduct"; // Add Product component
import SystemUser from "./components/SystemUser"; // Add SystemUser component
import ProfilePage from "./components/ProfilePage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/systemuser" element={<SystemUser />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
