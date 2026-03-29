import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// Create main axios instance
const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true // IMPORTANT for refresh token cookies
});

// ================= REQUEST INTERCEPTOR =================
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

// ================= RESPONSE INTERCEPTOR =================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        // unwrap your ApiResponse { status, message, data }
        if (response.data && response.data.data !== undefined) {
            response.data = response.data.data;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // ❗ Prevent retry loop
        if (originalRequest.url.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        // If 401 and not retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                console.log("Refreshing token...");

                const res = await axios.post(
                    `${API_BASE}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newTokens = res.data?.data || res.data;

                if (!newTokens?.accessToken) {
                    throw new Error("No access token received");
                }

                // Save new token
                localStorage.setItem("token", newTokens.accessToken);

                // Update header
                api.defaults.headers.common["Authorization"] =
                    `Bearer ${newTokens.accessToken}`;

                processQueue(null, newTokens.accessToken);

                // Retry original request
                originalRequest.headers.Authorization =
                    `Bearer ${newTokens.accessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                console.error("Refresh failed:", refreshError);

                processQueue(refreshError, null);

                // Logout user
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ================= API METHODS =================

// Auth
export const login = (email, password) =>
    api.post("/auth/login", { email, password });

export const logout = () =>
    api.post("/auth/logout");

// Admin
export const getTrainers = () => api.get("/admin/trainers");
export const addTrainer = (data) => api.post("/admin/trainers", data);
export const updateTrainer = (id, data) => api.put(`/admin/trainers/${id}`, data);
export const deleteTrainer = (id) => api.delete(`/admin/trainers/${id}`);

// Analyst - Batches
export const getBatches = () => api.get("/analyst/batches");
export const addBatch = (data) => api.post("/analyst/batches", data);
export const updateBatch = (id, data) => api.put(`/analyst/batches/${id}`, data);
export const deleteBatch = (id) => api.delete(`/analyst/batches/${id}`);

// Counsellor - Students
export const getStudents = () => api.get("/counsellor/students");
export const addStudent = (data) => api.post("/counsellor/students", data);
export const updateStudent = (id, data) => api.put(`/counsellor/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/counsellor/students/${id}`);

// Batch Progress (File Upload supported)
export const addBatchProgress = (data) => {
    const isFormData = data instanceof FormData;

    return api.post("/batch-progress", data, {
        headers: isFormData
            ? { "Content-Type": "multipart/form-data" }
            : {}
    });
};

export const getBatchProgress = () => api.get("/batch-progress");

export default api;