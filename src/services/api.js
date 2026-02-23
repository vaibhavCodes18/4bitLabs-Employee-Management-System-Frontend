import axios from 'axios';

const API_BASE = 'http://localhost:3000';

// Trainer endpoints
export const getTrainers = () => axios.get(`${API_BASE}/trainer`);
export const addTrainer = (data) => axios.post(`${API_BASE}/trainer`, data);
export const updateTrainer = (id, data) => axios.put(`${API_BASE}/trainer/${id}`, data);
export const deleteTrainer = (id) => axios.delete(`${API_BASE}/trainer/${id}`);

// Analyst endpoints
export const getAnalysts = () => axios.get(`${API_BASE}/analyst`);
export const addAnalyst = (data) => axios.post(`${API_BASE}/analyst`, data);
export const updateAnalyst = (id, data) => axios.put(`${API_BASE}/analyst/${id}`, data);
export const deleteAnalyst = (id) => axios.delete(`${API_BASE}/analyst/${id}`);

// Counsellor endpoints
export const getCounsellors = () => axios.get(`${API_BASE}/counsellors`);
export const addCounsellor = (data) => axios.post(`${API_BASE}/counsellors`, data);
export const updateCounsellor = (id, data) => axios.put(`${API_BASE}/counsellors/${id}`, data);
export const deleteCounsellor = (id) => axios.delete(`${API_BASE}/counsellors/${id}`);