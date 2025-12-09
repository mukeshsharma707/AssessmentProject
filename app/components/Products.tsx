"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const [data, setData] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // 🔥 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const API_URL = "http://localhost:3009/products";

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (err) {
        toast.error("Failed to fetch products");
        console.error(err);
      }
    };
    getProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData(data.filter((item) => item.id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  // Edit mode
  const handleEditProduct = (item: any) => setEditingProduct(item);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingProduct.id}`, editingProduct);
      setData(
        data.map((item) =>
          item.id === editingProduct.id ? editingProduct : item
        )
      );
      toast.success("Product updated successfully");
      setEditingProduct(null);
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  // 🔥 Pagination Logic
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>Products List</h1>

      {/* TABLE HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          padding: "10px",
          fontWeight: "bold",
          borderBottom: "2px solid black",
          marginBottom: "10px",
        }}
      >
        <div>Name</div>
        <div>Price</div>
        <div>Category</div>
        <div>Image</div>
        <div>Actions</div>
      </div>

      {/* PRODUCT ROWS */}
      {paginatedData.map((item: any, index: number) => (
        <div
          key={`${item.id}-${index}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>{item.name}</div>
          <div>₹{item.price}</div>
          <div>{item.category}</div>
          <div>
            <img
              src={item.image}
              alt={item.name}
              width="80"
              style={{ borderRadius: "5px" }}
            />
          </div>

          <div>
            <button
              style={{
                padding: "5px 12px",
                marginRight: "8px",
                background: "#0d6efd",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleEditProduct(item)}
            >
              Edit
            </button>
            <button
              style={{
                padding: "5px 12px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* PAGINATION CONTROLS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          style={{
            padding: "6px 12px",
            background: currentPage === 1 ? "#ccc" : "#0d6efd",
            color: "#fff",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: "6px 10px",
              background: currentPage === i + 1 ? "#198754" : "#f0f0f0",
              color: currentPage === i + 1 ? "white" : "black",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          style={{
            padding: "6px 12px",
            background: currentPage === totalPages ? "#ccc" : "#0d6efd",
            color: "#fff",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>

      {/* EDIT FORM */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            top: 10,
            left: "20%",
            width: "50%",
            backgroundColor: "#e0f0ff",
            padding: "20px",
            borderBottom: "2px solid #0d6efd",
            zIndex: 999,
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>
            Edit Product
          </h2>
          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={editingProduct.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Product
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
