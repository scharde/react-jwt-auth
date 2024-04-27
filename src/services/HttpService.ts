import axios from "axios";
import { getToken } from "./authService";

axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;

// Add a request interceptor to set the Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
