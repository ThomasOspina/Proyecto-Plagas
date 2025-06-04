import api from './axiosConfig';
// Asegúrate de que este archivo esté en la carpeta src/api/

// Función para crear usuario
export const crearUsuario = async (usuarioData: any) => {
  try {
    const response = await api.post('usuarios/', usuarioData);
    console.log('✅ Usuario creado:', response.data);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.detail || 'Error al crear usuario';
    console.error('❌ Error creando usuario:', msg);
    throw new Error(msg);
  }
};

// Nueva función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await api.get('usuarios/');
    console.log('👥 Usuarios obtenidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('💥 Error al obtener usuarios:', error);
    throw new Error('Error al obtener usuarios');
  }
}

