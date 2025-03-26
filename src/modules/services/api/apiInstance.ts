import axios from "axios";
import { baseURL } from "./apiConfig";

export const puplicAxiosInstance = axios.create({
  baseURL
});

export const privateAxiosInstance = axios.create({
  baseURL
});

privateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);