import axios from "axios";
import { clearSessionToken } from "@/lib/cookies";
import { clearAuthData } from "@/lib/local-storage";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.config.url !== "/auth/session" &&
      error.response?.status === 401
    ) {
      clearSessionToken();
      clearAuthData();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
