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
    image: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("category", formData.category);
    formDataObj.append("price", formData.price);
    formDataObj.append("description", formData.description);
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      const response = await fetch(
        editId ? `http://localhost:5000/api/Product/${editId}` : "http://localhost:5000/api/Product", 
        {
          method: editId ? "PUT" : "POST",
          body: formDataObj,
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
      <Sidebar activated="product"/>
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
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-md" required />
                <input 
                 type="number" 
                 name="price" 
                 placeholder="Price (USD)" 
                 value={formData.price} 
                 onChange={handleChange} 
                 className="w-full p-3 border rounded-md" 
                 min="0"  // Ensures the price cannot be negative
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
            <h3 className="text-xl font-semibold mt-36 mb-4 text-center">Product List</h3>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
                    {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />}
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-green-900 font-semibold mt-2">${product.price}</p>
                    <p className="text-gray-500 text-sm mt-2">{product.description}</p>
                    <div className="mt-4 flex justify-between">
                      <button onClick={() => handleEdit(product._id)} className="text-blue-800"><FaEdit /></button>
                      <button onClick={() => handleDelete(product._id)} className="text-red-900"><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500 text-center">No products added yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;