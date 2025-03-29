import axios from 'axios';

// Determine the API base URL based on environment
const API_URL = import.meta.env.VITE_API_URL || '/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, clear token but don't redirect
    if (error.response && error.response.status === 401) {
      console.log("401 Unauthorized response - clearing token");
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      
      // Removed window.location redirect
      // Let the components handle navigation instead
    }
    return Promise.reject(error);
  }
);

export default api; 