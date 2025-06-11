// src/api/plagas.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/api-plagas';

export const diagnosticarEnfermedad = async (reporteId: number) => {
  const response = await axios.post(`${BASE_URL}/guardar-diagnostico/`, {
    reporteFotos: reporteId,
  });
  return response.data;
};

export const obtenerDiagnosticos = async () => {
  const response = await axios.get(`${BASE_URL}/plagas/`);
  return response.data;
};


