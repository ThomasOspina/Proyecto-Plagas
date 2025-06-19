// src/api/usuario.ts
import api from './axiosConfig';

// ✅ Usar la ruta de registro personalizada que sí permite POST sin token
export const crearUsuario = async (usuarioData: any) => {
  try {
    const response = await api.post('usuarios/registro/', usuarioData);
    console.log('✅ Usuario creado:', response.data);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.detail || 'Error al crear usuario';
    console.error('❌ Error creando usuario:', msg);
    throw new Error(msg);
  }
};

export const obtenerUsuariosPublicos = async () => {
  try {
    const response = await api.get('usuarios/public/');
    console.log('👥 Usuarios públicos obtenidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('💥 Error al obtener usuarios públicos:', error);
    throw new Error('Error al obtener usuarios públicos');
  }
};

export const obtenerUsuarios = async () => {
  try {
    const response = await api.get('usuarios/public/');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    throw error;
  }
};

export const eliminarUsuario = async (cedula: string) => {
  try {
    const response = await api.delete(`usuarios/eliminar/${cedula}/`);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al eliminar usuario:', error);
    throw error;
  }
};

export const actualizarUsuario = async (id: number, usuarioData: any) => {
  try {
    const response = await api.put(`usuarios/publico/${id}/`, usuarioData);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al actualizar usuario:', error);
    throw error;
  }
};

