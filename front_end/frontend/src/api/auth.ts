// Este archivo es parte de la API del frontend para interactuar con el backend de usuarios.
import api from './axiosConfig';

export const loginUsuario = async (cedula: string, contraseña: string) => {
  try {
    const response = await api.post('usuarios/login/', {
      cedula,
      password: contraseña,  // ✅ CAMBIA "contraseña" por "password"
    });
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.error || 'Login fallido';
    throw new Error(msg);
  }
};


