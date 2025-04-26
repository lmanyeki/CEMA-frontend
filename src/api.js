import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000',
  // baseURL: 'https://cema-backend.onrender.com',
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

export const createProgram = (programData) => api.post('/programs', programData);
export const createClient = (clientData) => api.post('/clients', clientData);
export const enrollClient = (enrollmentData) => api.post('/enroll', enrollmentData);
export const searchClients = (query) => api.get(`/clients/search?query=${query}`);
export const getClientProfile = (id) => api.get(`/clients/${id}`);
export const getAllPrograms = () => api.get('/programs');

export default {
  createProgram,
  createClient,
  enrollClient,
  searchClients,
  getClientProfile,
  getAllPrograms,
};