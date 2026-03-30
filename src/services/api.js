import axios from 'axios';

// ─── Configuration ───────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Dedicated Axios instance for all API calls.
 * - baseURL ensures all requests hit the correct backend
 * - withCredentials ensures httpOnly cookies (refreshToken) are always sent/received
 */
const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Token Refresh Mutex ─────────────────────────────────────
// Prevents multiple concurrent 401 responses from spawning duplicate refresh calls.
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    failedQueue = [];
};

// ─── Request Interceptor ─────────────────────────────────────
// Attaches the JWT access token to every outgoing request.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────
// 1. Unwraps the Spring Boot ApiResponse { status, message, data } envelope.
// 2. On 401, attempts a silent token refresh using the httpOnly cookie.
api.interceptors.response.use(
    (response) => {
        // Unwrap Spring Boot ApiResponse wrapper if present
        if (response.data && response.data.data !== undefined) {
            response.data = response.data.data;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Only attempt refresh on 401 and not on auth endpoints themselves
        const isAuthEndpoint = originalRequest.url?.includes('/auth/');
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            
            if (isRefreshing) {
                // Another refresh is already in-flight — queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Use a clean axios instance to avoid triggering interceptors recursively.
                // withCredentials: true is critical so the browser sends the httpOnly refreshToken cookie.
                const refreshResponse = await axios.post(
                    `${API_BASE}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                // Backend wraps response in ApiResponse { status, message, data }
                const responseData = refreshResponse.data?.data || refreshResponse.data;
                const newAccessToken = responseData?.accessToken;

                if (newAccessToken) {
                    localStorage.setItem('token', newAccessToken);

                    // Retry the original failed request with the new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    
                    // Process all queued requests with the new token
                    processQueue(null, newAccessToken);

                    return api(originalRequest);
                } else {
                    // Refresh succeeded but no token returned — force re-login
                    throw new Error('No access token in refresh response');
                }
            } catch (refreshError) {
                // Refresh failed — clear session and redirect to login
                processQueue(refreshError, null);
                clearSessionAndRedirect();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ─── Session Cleanup ─────────────────────────────────────────
function clearSessionAndRedirect() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Only redirect if not already on login page (prevents redirect loops)
    if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
    }
}

// ═══════════════════════════════════════════════════════════════
//  AUTH ENDPOINTS
// ═══════════════════════════════════════════════════════════════
export const loginByRole = async (role, email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Interceptor unwraps ApiResponse → returns LoginResponseDto
};

export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (e) {
        console.error('Logout API call failed:', e);
    }
};

// ═══════════════════════════════════════════════════════════════
//  ADMIN — Employee Management
// ═══════════════════════════════════════════════════════════════
export const getTrainers    = ()          => api.get('/admin/trainers');
export const addTrainer     = (data)      => api.post('/admin/trainers', data);
export const updateTrainer  = (id, data)  => api.put(`/admin/trainers/${id}`, data);
export const deleteTrainer  = (id)        => api.delete(`/admin/trainers/${id}`);

export const getAnalysts    = ()          => api.get('/admin/analysts');
export const addAnalyst     = (data)      => api.post('/admin/analysts', data);
export const updateAnalyst  = (id, data)  => api.put(`/admin/analysts/${id}`, data);
export const deleteAnalyst  = (id)        => api.delete(`/admin/analysts/${id}`);

export const getCounsellors   = ()          => api.get('/admin/counsellors');
export const addCounsellor    = (data)      => api.post('/admin/counsellors', data);
export const updateCounsellor = (id, data)  => api.put(`/admin/counsellors/${id}`, data);
export const deleteCounsellor = (id)        => api.delete(`/admin/counsellors/${id}`);

// ═══════════════════════════════════════════════════════════════
//  ANALYST — Batch Management
// ═══════════════════════════════════════════════════════════════
export const getBatches   = ()          => api.get('/analyst/batches');
export const addBatch     = (data)      => api.post('/analyst/batches', data);
export const updateBatch  = (id, data)  => api.put(`/analyst/batches/${id}`, data);
export const deleteBatch  = (id)        => api.delete(`/analyst/batches/${id}`);

// ═══════════════════════════════════════════════════════════════
//  COUNSELLOR — Student Management
// ═══════════════════════════════════════════════════════════════
export const getStudents    = ()          => api.get('/counsellor/students');
export const addStudent     = (data)      => api.post('/counsellor/students', data);
export const updateStudent  = (id, data)  => api.put(`/counsellor/students/${id}`, data);
export const deleteStudent  = (id)        => api.delete(`/counsellor/students/${id}`);

// ═══════════════════════════════════════════════════════════════
//  ASSIGNMENTS — Batch ↔ Student Mapping
// ═══════════════════════════════════════════════════════════════
export const getStudentsByBatch   = (batchId) => api.get(`/assignments/batch/${batchId}`);
export const getAssignments       = ()        => api.get('/assignments');
export const assignStudentToBatch = (data)    => api.post('/assignments', data);
export const updateAssignment     = (data)    => api.put('/assignments/transfer', data);

// ═══════════════════════════════════════════════════════════════
//  TRAINER — Batch Progress
// ═══════════════════════════════════════════════════════════════
export const getBatchProgress = () => api.get('/batch-progress');
export const getBatchProgressByBatch = (batchId) => api.get(`/batch-progress/${batchId}`);

export const addBatchProgress = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/batch-progress', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

export const updateBatchProgress = (id, data) => {
    const isFormData = data instanceof FormData;
    return api.put(`/batch-progress/${id}`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};

export const deleteBatchProgress = (id) => api.delete(`/batch-progress/${id}`);

// ─── Export the configured instance for advanced use ──────────
export default api;