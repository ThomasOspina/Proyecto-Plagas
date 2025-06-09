import api from './axiosConfig';

interface RegistroSiembraPayload {
  fecha_siembra: string;
  cantidad_plantas: number;
  tipo_planta: string;
  ubicacion: string;
  numeroLote: string;
  gestion: number;
  usuario: number;
}

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

export const obtenerSiembras = async () => {
  try {
    const response = await api.get('registro-siembra/');
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener siembras:', error);
    throw new Error('Error al obtener siembras');
  }
};

