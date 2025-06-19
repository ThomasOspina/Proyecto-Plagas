// src/api/tratamientos.ts
import api from './axiosConfig';

export interface PlanTratamientoPayload {
  fecha_inicio: string;
  fecha_fin: string;
  informetratamiento: string;
  api: number;      // ID del diagnóstico (ApiPlagas)
  usuario: number;  // ID del técnico o quien registra
}

export interface PlanTratamiento extends PlanTratamientoPayload {
  id_planificacion: number;
}

export const crearPlanTratamiento = async (data: PlanTratamientoPayload) => {
  const res = await api.post('planificacion-tratamiento/', data);
  return res.data;
};

export const obtenerPlanes = async (): Promise<PlanTratamiento[]> => {
  const res = await api.get('planificacion-tratamiento/');
  return res.data;
};

export const eliminarPlan = async (id: number) => {
  await api.delete(`planificacion-tratamiento/${id}/`);
};

export const actualizarPlan = async (id: number, data: Partial<PlanTratamientoPayload>) => {
  const res = await api.put(`planificacion-tratamiento/${id}/`, data);
  return res.data;
};


