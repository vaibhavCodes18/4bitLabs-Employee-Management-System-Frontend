import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// Create instance
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // required for refresh token cookie
});

// ================= REQUEST =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE =================
api.interceptors.response.use(
  (response) => {
    // unwrap ApiResponse { status, message, data }
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // prevent infinite loop
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // handle expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Refreshing token...");

        // IMPORTANT: use same instance
        const res = await api.post("/auth/refresh");

        const newToken =
          res?.accessToken || res?.data?.accessToken;

        if (!newToken) {
          throw new Error("No access token received");
        }

        // store new token
        localStorage.setItem("token", newToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        // logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
