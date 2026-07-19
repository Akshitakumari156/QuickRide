import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "";
console.log("BASE_URL =", BASE_URL);
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("userToken") || localStorage.getItem("captainToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
