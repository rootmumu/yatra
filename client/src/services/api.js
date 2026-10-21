import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('yathra_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Properties
export const getProperties = (params) => api.get('/properties', { params });
export const getPropertyById = (id) => api.get(`/properties/${id}`);
export const getPropertyAvailability = (id) => api.get(`/properties/${id}/availability`);
export const createProperty = (data) => api.post('/properties', data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);
export const togglePropertyStatus = (id) => api.patch(`/properties/${id}/toggle-status`);
export const blockPropertyDates = (id, dates) => api.post(`/properties/${id}/block-dates`, { dates });
export const unblockPropertyDates = (id, dates) => api.post(`/properties/${id}/unblock-dates`, { dates });

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getBookings = (params) => api.get('/bookings', { params });
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status });

// Auth
export const adminLogin = (credentials) => api.post('/auth/login', credentials);
export const getAdminMe = () => api.get('/auth/me');

// Stats
export const getDashboardStats = () => api.get('/stats');

export default api;
