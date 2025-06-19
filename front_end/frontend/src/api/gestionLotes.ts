import api from './axiosConfig';

export const crearGestionLote = async (datos: { fecha_gestion: string; estado_lote: string }) => {
  const response = await api.post('gestion-lotes/', datos);
  return response.data;
};

export const obtenerGestiones = async () => {
  const response = await api.get('gestion-lotes/');
  return response.data;
};

export const eliminarGestionLote = async (id: number) => {
  await api.delete(`gestion-lotes/${id}/`);
};

export const actualizarGestionLote = async (id: number, datos: { fecha_gestion: string; estado_lote: string }) => {
  const response = await api.put(`gestion-lotes/${id}/`, datos);
  return response.data;
};

