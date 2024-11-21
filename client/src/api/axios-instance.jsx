import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      const response = await axiosInstance.post("/auth/refresh-token", {
        refreshToken,
      });
      if (response.status === 200) {
        Cookies.set("accessToken", response.data.accessToken, {
          sameSite: "strict",
          secure: true,
        });
        Cookies.set("refreshToken", response.data.refreshToken, {
          sameSite: "strict",
          secure: true,
        });

        // localStorage.setItem("accessToken", response.data.accessToken);
        // localStorage.setItem("refreshToken", response.data.refreshToken);
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
