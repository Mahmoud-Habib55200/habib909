import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";

function Home() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.products);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Product Catalog
            </h1>
            <p className="text-gray-600 mt-2">Manage your product inventory</p>
          </div>

          <button
            onClick={() => setShowProductForm(!showProductForm)}
            className="mt-4 md:mt-0 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            {showProductForm ? "Close Form" : "Add New Product"}
          </button>
        </div>

        {/* Add Product Form */}
        {showProductForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Product
            </h2>
            <AddProductForm onSuccess={() => setShowProductForm(false)} />
          </div>
        )}

        {/* Products Grid */}
        {list.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                All Products
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {list.length} {list.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          // Empty state
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 3h6m-6 3h6"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">
              No products yet
            </h3>
            <p className="text-gray-500 mt-2">
              Get started by adding your first product
            </p>
            <button
              onClick={() => setShowProductForm(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
