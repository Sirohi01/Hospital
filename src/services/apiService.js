import axios from "axios";

// Vite environment variable
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api/v1";

// axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;