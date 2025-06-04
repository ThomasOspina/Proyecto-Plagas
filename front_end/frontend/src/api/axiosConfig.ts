// src/api/axiosConfig.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// 👉 Interceptor de request para enviar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Interceptor de respuesta para detectar errores 401 y refrescar token
api.interceptors.response.use(
  response => response, // Si la respuesta es exitosa, continúa
  async error => {
    const originalRequest = error.config;

    // Si el error es 401 y no se ha intentado refrescar aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Intenta refrescar el token
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        // Actualiza el token en el request original
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Reintenta la petición original con el nuevo token
        return api(originalRequest);

      } catch (refreshError) {
        console.error('❌ Error al refrescar el token', refreshError);
        // Aquí podrías redirigir al login si quieres:
        localStorage.clear();
        window.location.href = '/login'; // Cambia según tu ruta
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

