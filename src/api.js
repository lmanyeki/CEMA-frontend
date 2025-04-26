import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5173',
  // baseURL: 'https://cema-backend.onrender.com',
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5173',
});

export const createProgram = async (programData) => {
  try {
    const response = await api.post('/api/programs', programData);
    return response.data;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    throw new Error(error.response?.data?.message || 'Failed to create program');
  }
};
export const createClient = (clientData) => api.post('/clients', clientData);
export const enrollClient = (enrollmentData) => api.post('/enroll', enrollmentData);
export const searchClients = (query) => api.get(`/clients/search?query=${query}`);
export const getClientProfile = (id) => api.get(`/clients/${id}`);
export const getAllPrograms = async () => {
  try {
    const response = await api.get('/api/programs');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
export const getEnrollmentStats = async () => {
  try {
    const response = await api.get('/api/reports/enrollments');
    return {
      data: Array.isArray(response.data) ? response.data : [],
      error: null
    };
  } catch (error) {
    console.error('API Error (enrollments):', error);
    return { data: [], error: error.message };
  }
};
export const getClientDemographics = async () => {
  try {
    const response = await api.get('/api/reports/demographics');
    return {
      data: response.data || {},
      error: null
    };
  } catch (error) {
    console.error('API Error (demographics):', error);
    return { data: {}, error: error.message };
  }
};
export const getAllClients = async () => {
  try {
    const response = await api.get('/api/clients');
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
export default {
  createProgram,
  createClient,
  enrollClient,
  searchClients,
  getClientProfile,
  getAllPrograms,
  getEnrollmentStats,
  getClientDemographics,
};