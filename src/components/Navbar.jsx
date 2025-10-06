import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-2 text-gray-800"
          : "bg-gradient-to-r from-blue-900 to-indigo-900 py-4 text-white"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight flex items-center"
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Elegance
          </span>
          <span className="text-blue-400 ml-1">Commerce</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium transition-colors hover:text-blue-400 ${
              location.pathname === "/" ? "text-blue-400" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`font-medium transition-colors hover:text-blue-400 ${
              location.pathname === "/products" ? "text-blue-400" : ""
            }`}
          >
            Products
          </Link>

          <Link
            to="/about"
            className={`font-medium transition-colors hover:text-blue-400 ${
              location.pathname === "/about" ? "text-blue-400" : ""
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`font-medium transition-colors hover:text-blue-400 ${
              location.pathname === "/contact" ? "text-blue-400" : ""
            }`}
          >
            Contact
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Shopping Cart Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>

          {token ? (
            <div className="flex items-center space-x-4">
              {/* User dropdown menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="font-medium hidden sm:block">
                    {user?.name || "User"}
                  </span>
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
                  >
                    Wishlist
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => dispatch(logout())}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md font-medium transition-colors hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md font-medium transition-all hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
