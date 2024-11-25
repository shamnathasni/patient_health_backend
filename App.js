import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://patient-health-backend.onrender.com', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies if required by backend
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
