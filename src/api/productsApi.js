import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

// Helper function to add token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(API_URL, productData, getAuthHeader());
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader());
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return res.data;
};
