// client/src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const loginUser = (data) => api.post('/auth/login', data);
export const signupUser = (data) => api.post('/auth/signup', data);
export const fetchMedications = (token) => {
  return axios.get('http://localhost:5000/api/medications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addMedication = (data, token) =>
  api.post('/medications', data, { headers: { Authorization: `Bearer ${token}` } });
export const markAsTaken = (id, token) =>
  api.patch(`/medications/${id}/taken`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const getAdherence = (token) =>
  api.get('/medications/adherence', { headers: { Authorization: `Bearer ${token}` } });

export const uploadProofPhoto = (id, file, token) => {
  const formData = new FormData();
  formData.append('photo', file);

  return api.post(`/medications/${id}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;