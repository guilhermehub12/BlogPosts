import axios from "axios";

export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log com o erro mizeravi
    console.error("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
