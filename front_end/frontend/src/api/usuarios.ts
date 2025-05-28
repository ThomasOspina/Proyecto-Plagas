// src/api/usuarios.ts
// Asegúrate de que este archivo esté en la carpeta src/api/
const API_URL = 'http://127.0.0.1:8000/api/usuarios/';

// Función para crear usuario
export const crearUsuario = async (usuarioData: any) => {
  try {
    console.log('📤 Enviando datos:', usuarioData); // Para debug
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });

    console.log('📡 Response status:', response.status); // Para debug

    if (!response.ok) {
      // Obtener el mensaje de error del servidor
      const errorData = await response.text();
      console.log('❌ Error del servidor:', errorData);
      throw new Error(`Error ${response.status}: ${errorData}`);
    }

    const result = await response.json();
    console.log('✅ Usuario creado:', result); // Para debug
    return result;
    
  } catch (error) {
    console.error('💥 Error completo:', error);
    throw error;
  }
};

// Nueva función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    console.log('🔍 Intentando obtener usuarios...');
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 GET Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error GET:', errorText);
      throw new Error(`Error ${response.status}: ${errorText || 'No se pudieron obtener los usuarios'}`);
    }

    const usuarios = await response.json();
    console.log('👥 Usuarios obtenidos:', usuarios);
    return usuarios;
    
  } catch (error) {
    console.error('💥 Error al obtener usuarios:', error);
    throw error;
  }
};