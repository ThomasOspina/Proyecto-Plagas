// src/api/tratamientos.ts
import api from './axiosConfig';

export interface PlanTratamientoPayload {
  fecha_inicio: string;
  fecha_fin: string;
  informetratamiento: string;
  api: number;      // ID del diagnóstico (ApiPlagas)
  usuario: number; // ID del técnico o quien registra
}

export const crearPlanTratamiento = async (data: PlanTratamientoPayload) => {
  const res = await api.post('planificacion-tratamiento/', data);
  return res.data;
};

export const obtenerPlanes = async () => {
  const res = await api.get('planificacion-tratamiento/');
  return res.data;
};

