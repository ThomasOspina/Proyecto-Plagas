import api from './axiosConfig';

export const crearGestionLote = async (datos: { fecha_gestion: string; estado_lote: string }) => {
  try {
    const response = await api.post('gestion-lotes/', datos);
    console.log('✅ Gestión de lote guardada:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al guardar gestión:', error);
    throw new Error(error.response?.data?.detail || 'Error al guardar gestión de lote');
  }
};

export const obtenerGestiones = async () => {
  try {
    const response = await api.get('gestion-lotes/');
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener gestiones:', error);
    throw error;
  }
};
