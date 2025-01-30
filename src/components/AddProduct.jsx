import React, { useReducer, useState } from "react";
import { FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Reducer for managing product state
const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, { ...action.payload, id: Date.now() }];
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== action.payload);
    case "UPDATE_PRODUCT":
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    default:
      return state;
  }
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  const [products, dispatch] = useReducer(productReducer, []);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      alert("Please fill out all fields.");
      return;
    }

    if (editId) {
      dispatch({ type: "UPDATE_PRODUCT", payload: { ...formData, id: editId } });
      setEditId(null);
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: formData });
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      image: null,
    });
    setFormVisible(false);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setFormData(productToEdit);
    setEditId(id);
    setFormVisible(true);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 flex-1">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
            <button
              onClick={() => setFormVisible(!isFormVisible)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              {isFormVisible ? "Cancel" : "Add Product"}
            </button>
          </header>

          {isFormVisible && (
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editId ? "Edit Product" : "Add New Product"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price (USD)"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  required
                ></textarea>

                {/* File Upload */}
                <label className="block w-full border-2 border-dashed p-6 text-center cursor-pointer rounded-md hover:border-green-500 transition-all duration-300">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <FaUpload className="text-gray-500 text-2xl mx-auto" />
                  <p className="text-gray-600 mt-2">Click or drag file to upload</p>
                  {formData.image && (
                    <p className="text-green-500 mt-2">{formData.image.name}</p>
                  )}
                </label>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
                >
                  {editId ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Product List</h3>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {product.image && (
                      <img
                        src={URL.createObjectURL(product.image)}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                    <p className="text-gray-500 text-sm mt-2">{product.description}</p>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;