import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

// --- Axios Interceptors ---
// Add the JWT token to every request
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Ensure Bearer format is sent correctly
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Failed to parse access token for interceptor", error);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Unwrap Spring Boot "ApiResponse" layer automatically, and catch 401s for Refresh Token
axios.interceptors.response.use(
    (response) => {
        // If the backend returned a wrapper like { status, message, data } 
        // return just the inner data so it behaves like json-server for components
        if (response.data && response.data.data !== undefined) {
            response.data = response.data.data;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // If backend returned 401 (Unauthorized) and we haven't already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Because refresh token is an HttpOnly cookie, we just push the POST
                // (Ensure backend allows credentials for CORS if domains ever separate)
                const refreshResponse = await axios.post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true });

                const newTokens = refreshResponse.data.data || refreshResponse.data;
                if (newTokens && newTokens.accessToken) {
                    // Save new access token
                    localStorage.setItem("token", newTokens.accessToken);

                    // Attach it to the failed request
                    originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                    // Retry the original request
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails (e.g., token expired), wipe session and kick to login
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// ─── Auth ────────────────────────────────────────────────────
export const loginByRole = async (role, email, password) => {
    const endpoint = "auth/login";
    const response = await axios.post(`${API_BASE}/${endpoint}`, { email, password });
    return response.data; // The interceptor above makes this the actual user object
};

export const logout = async () => {
    try {
        await axios.post(`${API_BASE}/auth/logout`);
    } catch (e) {
        console.error("Logout API failed", e);
    }
};

// ─── Admin Management endpoints ──────────────────────────────
export const getTrainers = () => axios.get(`${API_BASE}/admin/trainers`);
export const addTrainer = (data) => axios.post(`${API_BASE}/admin/trainers`, data);
export const updateTrainer = (id, data) => {
    axios.put(`${API_BASE}/admin/trainers/${id}`, data); console.log(data);
};
export const deleteTrainer = (id) => axios.delete(`${API_BASE}/admin/trainers/${id}`);

export const getAnalysts = () => axios.get(`${API_BASE}/admin/analysts`);
export const addAnalyst = (data) => axios.post(`${API_BASE}/admin/analysts`, data);
export const updateAnalyst = (id, data) => axios.put(`${API_BASE}/admin/analysts/${id}`, data);
export const deleteAnalyst = (id) => axios.delete(`${API_BASE}/admin/analysts/${id}`);

export const getCounsellors = () => axios.get(`${API_BASE}/admin/counsellors`);
export const addCounsellor = (data) => axios.post(`${API_BASE}/admin/counsellors`, data);
export const updateCounsellor = (id, data) => axios.put(`${API_BASE}/admin/counsellors/${id}`, data);
export const deleteCounsellor = (id) => axios.delete(`${API_BASE}/admin/counsellors/${id}`);

// ─── Batches endpoints (Analyst) ─────────────────────────────
export const getBatches = () => axios.get(`${API_BASE}/analyst/batches`);
export const addBatch = (data) => axios.post(`${API_BASE}/analyst/batches`, data);
export const updateBatch = (id, data) => axios.put(`${API_BASE}/analyst/batches/${id}`, data);
export const deleteBatch = (id) => axios.delete(`${API_BASE}/analyst/batches/${id}`);

// ─── Students (Counsellor) ───────────────────────────────────
export const getStudents = () => axios.get(`${API_BASE}/counsellor/students`);
export const addStudent = (data) => axios.post(`${API_BASE}/counsellor/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_BASE}/counsellor/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_BASE}/counsellor/students/${id}`);

// ─── Assignments (Backend Maps) ────────────────────────────────
// Real backend endpoint retrieves all students for a specific batch explicitly.
export const getStudentsByBatch = (batchId) => axios.get(`${API_BASE}/assignments/batch/${batchId}`);
export const getAssignments = () => axios.get(`${API_BASE}/assignments`);
export const assignStudentToBatch = (data) => axios.post(`${API_BASE}/assignments`, data);
// Transfer uses PUT on /assignments/transfer
export const updateAssignment = (data) => axios.put(`${API_BASE}/assignments/transfer`, data);

// ─── Batch Progress (Trainer) ────────────────────────────────
export const getBatchProgress = () => axios.get(`${API_BASE}/batch-progress`); // Update if get all added
export const getBatchProgressByBatch = (batchId) => axios.get(`${API_BASE}/batch-progress/${batchId}`);
export const addBatchProgress = (data) => {
    // Determine headers if data is FormData
    const isFormData = data instanceof FormData;
    return axios.post(`${API_BASE}/batch-progress`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
};
export const updateBatchProgress = (id, data) => axios.put(`${API_BASE}/batch-progress/${id}`, data);
export const deleteBatchProgress = (id) => axios.delete(`${API_BASE}/batch-progress/${id}`);