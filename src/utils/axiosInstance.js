// src/axiosConfig.js
import axios from "axios";
import { redirect } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://dev-backend.paperlink.app", // Replace with your API URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.accessToken = token;
    console.log("Token:", token); // Log the token only if it exists
  } else {
    redirect("/login"); // Redirect to the login page
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 2001) {
      // After successful login
      redirect("/paperLink");
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Authentication error:", error.response.status);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
