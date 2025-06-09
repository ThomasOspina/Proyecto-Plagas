import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
        localStorage.clear();
        window.location.href = '/login'; // Ajusta según tu ruta
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;


