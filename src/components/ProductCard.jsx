import {  useState } from "react";
import { deleteProduct, updateProduct } from "../api/productsApi";
import { useAppDispatch } from "../app/hooks";

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [isDeleting, setIsDeleting] = useState(false);

  // 🗑️ Delete handler
  const handleDelete = () => {
    setIsDeleting(true);
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(product._id));
    }
    setTimeout(() => setIsDeleting(false), 300);
  };

  // ✏️ Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedTitle(product.title);
    }
  };

  // 💾 Save updates
  const handleSave = () => {
    const updates = { title: editedTitle };
    dispatch(updateProduct({ id: product._id, updates }));
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(product.title);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isDeleting ? "opacity-50 scale-95" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden group">
        <img
          src={
            product.images[0] ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {product.category || "Uncategorized"}
          </span>
        </div>
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={toggleEdit}
            className="mx-1 p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
            aria-label="Edit product"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="mx-1 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            aria-label="Delete product"
          >
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {isEditing ? (
          <div className="mb-3">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        ) : (
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 h-14">
            {product.title}
          </h3>
        )}

        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-blue-700">${product.price}</p>

          {product.stock !== undefined && (
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                product.stock > 10
                  ? "bg-green-100 text-green-800"
                  : product.stock > 0
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          )}
        </div>

        {/* Edit Mode Actions */}
        {isEditing && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Regular View Actions */}
        {!isEditing && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={toggleEdit}
              className="flex items-center justify-center gap-1 flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-1 flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
