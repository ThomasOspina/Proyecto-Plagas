import api from './axiosConfig';

interface RegistroSiembraPayload {
  id_registro?: number;
  fecha_siembra: string;
  cantidad_plantas: number;
  tipo_planta: string;
  ubicacion: string;
  numeroLote: string;
  gestion: number;
  usuario: number;
}

// Crear siembra
export const crearRegistroSiembra = async (datos: RegistroSiembraPayload) => {
  try {
    const response = await api.post('registro-siembra/', datos);
    console.log('✅ Siembra registrada:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al registrar siembra:', error);
    throw new Error('Error al registrar siembra');
  }
};

// Obtener todas las siembras
export const obtenerSiembras = async () => {
  try {
    const response = await api.get('registro-siembra/');
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener siembras:', error);
    throw new Error('Error al obtener siembras');
  }
};

// Actualizar siembra
export const actualizarSiembra = async (id: number, datos: RegistroSiembraPayload) => {
  try {
    const response = await api.put(`registro-siembra/${id}/`, datos);
    console.log('✅ Siembra actualizada:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al actualizar siembra:', error);
    throw new Error('Error al actualizar siembra');
  }
};

// Eliminar siembra
export const eliminarSiembra = async (id: number) => {
  try {
    const response = await api.delete(`registro-siembra/${id}/`);
    console.log('🗑️ Siembra eliminada:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al eliminar siembra:', error);
    throw new Error('Error al eliminar siembra');
  }
};



