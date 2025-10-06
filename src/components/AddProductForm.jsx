import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../api/productsApi";

export default function AddProductForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [""],
  });

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Product title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.stock || Number(form.stock) < 0)
      newErrors.stock = "Valid stock quantity is required";

    // Validate image URLs
    form.images.forEach((img, index) => {
      if (img && !isValidUrl(img)) {
        newErrors[`image-${index}`] = "Please enter a valid URL";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e, index) => {
    const newImages = [...form.images];
    newImages[index] = e.target.value;
    setForm({ ...form, images: newImages });

    // Clear image error
    if (errors[`image-${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`image-${index}`];
      setErrors(newErrors);
    }
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    if (form.images.length > 1) {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm({ ...form, images: newImages });

      // Remove related error
      const newErrors = { ...errors };
      delete newErrors[`image-${index}`];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await dispatch(
        createProduct({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        })
      ).unwrap();

      // Reset form on success
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: [""],
      });

      setErrors({});

      // Notify parent component
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to create product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-gray-600 mt-1">
          Fill in the details below to add a new product to your catalog
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., Premium Wireless Headphones"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
              errors.title
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
            }`}
            required
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Describe your product in detail..."
            value={form.description}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
              errors.description
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
            }`}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Price Field */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                  errors.price
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                required
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {/* Stock Field */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              placeholder="e.g., 100"
              value={form.stock}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                errors.stock
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
              required
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
            )}
          </div>
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category *
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="e.g., Electronics, Clothing, Books"
            value={form.category}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
              errors.category
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
            }`}
            required
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URLs
          </label>
          <div className="space-y-3">
            {form.images.map((img, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={img}
                    onChange={(e) => handleImageChange(e, index)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                      errors[`image-${index}`]
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  />
                  {errors[`image-${index}`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[`image-${index}`]}
                    </p>
                  )}
                </div>
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="mt-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove image"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addImageField}
            className="mt-3 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add another image URL
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Product...
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
