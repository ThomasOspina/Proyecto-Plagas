// src/api/monitoreo.ts
import api from './axiosConfig';

export const crearMonitoreo = async (
  registroId: number,
  reporte: string,
  observacionAnomalia: string
) => {
  try {
    const response = await api.post('monitoreo-plagas/', {
      registro: registroId,
      fecha_monitoreo: new Date().toISOString().split('T')[0], // puedes omitir si el backend lo asigna automáticamente
      reporte,
      observacionAnomalia,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al registrar monitoreo');
  }
};

export const crearFotoMonitoreo = async (registroId: number, imagen: File) => {
  try {
    const formData = new FormData();
    formData.append('registro', registroId.toString());
    formData.append('foto', imagen);

    // ✅ Corrección: URL correcta según el path definido en tus urls.py
    const response = await api.post('monitoreo-plagas/crear-monitoreo-con-foto/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al subir imagen');
  }
};


