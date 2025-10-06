import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Attach token automatically if exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // بعد ما تعمل login خزّن التوكن
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
