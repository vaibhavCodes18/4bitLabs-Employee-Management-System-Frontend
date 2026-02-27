import axios from 'axios';

const API_BASE = 'http://localhost:3000';

// ─── Auth ────────────────────────────────────────────────────
// Role → json-server endpoint mapping
const ROLE_ENDPOINTS = {
    admin: 'admin',
    trainer: 'trainer',
    analyst: 'analyst',
    counsellor: 'counsellors',
};

/**
 * Authenticate a user by fetching all users for the given role
 * from json-server and matching email + password.
 * Returns the matched user object or null.
 */
export const loginByRole = async (role, email, password) => {
    const endpoint = ROLE_ENDPOINTS[role];
    if (!endpoint) return null;

    const response = await axios.get(`${API_BASE}/${endpoint}`);
    const users = response.data;

    return users.find((u) => u.email === email && u.password === password) || null;
};

// ─── Trainer endpoints ───────────────────────────────────────
export const getTrainers = () => axios.get(`${API_BASE}/trainer`);
export const addTrainer = (data) => axios.post(`${API_BASE}/trainer`, data);
export const updateTrainer = (id, data) => axios.put(`${API_BASE}/trainer/${id}`, data);
export const deleteTrainer = (id) => axios.delete(`${API_BASE}/trainer/${id}`);

// ─── Analyst endpoints ───────────────────────────────────────
export const getAnalysts = () => axios.get(`${API_BASE}/analyst`);
export const addAnalyst = (data) => axios.post(`${API_BASE}/analyst`, data);
export const updateAnalyst = (id, data) => axios.put(`${API_BASE}/analyst/${id}`, data);
export const deleteAnalyst = (id) => axios.delete(`${API_BASE}/analyst/${id}`);

// ─── Counsellor endpoints ────────────────────────────────────
export const getCounsellors = () => axios.get(`${API_BASE}/counsellors`);
export const addCounsellor = (data) => axios.post(`${API_BASE}/counsellors`, data);
export const updateCounsellor = (id, data) => axios.put(`${API_BASE}/counsellors/${id}`, data);
export const deleteCounsellor = (id) => axios.delete(`${API_BASE}/counsellors/${id}`);

// ─── Batches endpoints ───────────────────────────────────────
export const getBatches = () => axios.get(`${API_BASE}/batches`);
export const addBatch = (data) => axios.post(`${API_BASE}/batches`, data);
export const updateBatch = (id, data) => axios.put(`${API_BASE}/batches/${id}`, data);
export const deleteBatch = (id) => axios.delete(`${API_BASE}/batches/${id}`);

// Students
export const getStudents = () => axios.get(`${API_BASE}/students`);
export const addStudent = (data) => axios.post(`${API_BASE}/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_BASE}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_BASE}/students/${id}`);

// Assignments
export const getAssignments = () => axios.get(`${API_BASE}/assignments`);
export const assignStudentToBatch = (data) => axios.post(`${API_BASE}/assignments`, data);
export const updateAssignment = (id, data) => axios.put(`${API_BASE}/assignments/${id}`, data);
export const deleteAssignment = (id) => axios.delete(`${API_BASE}/assignments/${id}`);