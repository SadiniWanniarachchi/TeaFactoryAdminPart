import React, { useEffect, useState } from "react";
import { FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [products, setProducts] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Upload file to cloudinary and return the response
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadResponse = null;

      if (formData.image) {
        uploadResponse = await uploadToCloudinary(formData.image);
        console.log("Upload Response:", uploadResponse);
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        description: formData.description,
        image: uploadResponse ? uploadResponse : "https://www.hmmawards.com/wp-content/uploads/woocommerce-placeholder-300x300.png",
      };

      const response = await fetch(
        editId ? `http://localhost:5000/api/Product/${editId}` : "http://localhost:5000/api/Product",
        {
          method: editId ? "PUT" : "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('error response: ', error);
        throw new Error("Failed to save product");
      }

      const product = await response.json();
      setProducts(editId ? products.map(p => (p._id === editId ? product : p)) : [...products, product]);
      setEditId(null);
      setFormData({ name: "", category: "", price: "", description: "", image: null });
      setFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/Product/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setFormData({ ...productToEdit, image: null });
    setEditId(id);
    setFormVisible(true);
  };

  return (
    <div className="flex bg-white font-kulim">
      <Sidebar activated="product" />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 flex-1">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
            <button onClick={() => setFormVisible(!isFormVisible)} className="bg-green-900 text-white px-6 py-3 rounded-lg shadow-md mt-9 transition-transform hover:scale-105 flex items-center">
              {isFormVisible ? "Cancel" : "Add Product"}
            </button>
          </header>

          {isFormVisible && (
            <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{editId ? "Edit Product" : "Add New Product"}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-md" required />

                {/* Category Dropdown */}
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${formData.category ? 'text-black' : 'text-gray-400'}`}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Herbal Tea">Herbal Infusion</option>
                  <option value="Black Tea">Fully Oxidized Tea</option>
                  <option value="Oolong Tea">Semi-Oxidized Tea</option>
                  <option value="Yellow Tea">Lightly Fermented Tea</option>
                  <option value="Lemon Tea">Flavored Tea</option>
                  {/* Add more categories as needed */}
                </select>


                <input
                  type="number"
                  name="price"
                  placeholder="Price (USD)"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  min="0"  // Ensures the price cannot be negative
                  step="0.01"  // Allows decimals in the price
                  required
                />

                <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-md" rows="3" required></textarea>

                <label className="block w-full border-2 border-dashed p-6 text-center cursor-pointer rounded-md">
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  <FaUpload className="text-gray-500 text-2xl mx-auto" />
                  <p className="text-gray-600 mt-2">Click or drag file to upload</p>
                  {formData.image && <p className="text-green-900 mt-2">{formData.image.name}</p>}
                </label>

                <button type="submit" className="w-full bg-green-900 text-white py-3 rounded-md text-lg font-semibold">
                  {editId ? "Update Product" : "Add Product"}

                </button>
              </form>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-3xl font-bold mt-12 mb-4 text-center">Product List</h3>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}

                    {/* Name and Price in the Same Row */}
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xl text-green-900">{product.name}</h4>
                      <p className="text-green-900 font-bold text-xl">${product.price}</p>
                    </div>

                    {/* Category and Description */}
                    <p className="text-black text-lg font-bold mt-2">{product.category}</p>
                    <p className="text-black text-base mt-2">{product.description}</p>

                    {/* Edit and Delete Buttons */}
                    <div className="mt-4 flex justify-between">
                      <button onClick={() => handleEdit(product._id)} className="text-blue-800 text-2xl">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="text-red-900 text-2xl">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No products added yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;