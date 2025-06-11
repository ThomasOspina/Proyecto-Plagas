import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { diagnosticarEnfermedad } from '../../api/apiplagas';

interface ReporteFoto {
  id_reporteFotos: number;
  descripcion: string;
  foto: string;
}

interface ResultadoDiagnostico {
  planta: string;
  planta_nombre_cientifico: string;
  enfermedad: string;
  enfermedad_nombre_cientifico: string;
}

const DiagnosticoEnfermedades: React.FC = () => {
  const [reportes, setReportes] = useState<ReporteFoto[]>([]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState<ReporteFoto | null>(null);
  const [resultado, setResultado] = useState<ResultadoDiagnostico | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reporte-fotos/')
      .then(res => setReportes(res.data))
      .catch(() => setMensaje('Error al cargar los reportes.'));
  }, []);

  const manejarSeleccion = (id: number) => {
    const seleccionado = reportes.find(r => r.id_reporteFotos === id) || null;
    setReporteSeleccionado(seleccionado);
    setResultado(null);
    setMensaje('');
  };

  const enviarDiagnostico = async () => {
    if (!reporteSeleccionado) {
      setMensaje('Seleccione un reporte para diagnosticar.');
      return;
    }

    setCargando(true);
    setMensaje('');
    setResultado(null);

    try {
      const data = await diagnosticarEnfermedad(reporteSeleccionado.id_reporteFotos);
      setResultado({
        planta: data.planta,
        planta_nombre_cientifico: data.planta_nombre_cientifico,
        enfermedad: data.enfermedad,
        enfermedad_nombre_cientifico: data.enfermedad_nombre_cientifico
      });
      setMensaje('Diagnóstico exitoso');
    } catch (err: any) {
      setMensaje(err.response?.data?.error || 'Error al procesar el diagnóstico.');
    } finally {
      setCargando(false);
    }
  };

  const obtenerUrlImagen = (foto: string) => {
    if (!foto) return '';
    return foto.startsWith('http')
      ? foto
      : `http://localhost:8000/media/${foto.replace(/^\/?media\/?/, '')}`;
  };

  return (
    <div className="campesino-container">
      <h2 className="upload-title">Diagnóstico de Enfermedades</h2>

      <div className="upload-card">
        <label htmlFor="reporte">Selecciona un reporte:</label>
        <select
          id="reporte"
          onChange={e => manejarSeleccion(Number(e.target.value))}
          className="send-button"
        >
          <option value="">-- Selecciona --</option>
          {reportes.map(reporte => (
            <option key={reporte.id_reporteFotos} value={reporte.id_reporteFotos}>
              {`Reporte #${reporte.id_reporteFotos}`}
            </option>
          ))}
        </select>

        {reporteSeleccionado && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Imagen seleccionada:</h4>
            <img
              src={obtenerUrlImagen(reporteSeleccionado.foto)}
              alt="Reporte seleccionado"
              style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '1rem' }}
            />
          </div>
        )}

        <button
          className="send-button"
          onClick={enviarDiagnostico}
          disabled={cargando}
        >
          {cargando ? 'Analizando...' : 'Diagnosticar'}
        </button>

        {mensaje && <div className="mensaje-exito">{mensaje}</div>}

        {resultado && (
          <div className="info-section">
            <h3>Resultado del Diagnóstico:</h3>
            <p><strong>Planta:</strong> {resultado.planta}</p>
            <p><strong>Nombre científico de la planta:</strong> {resultado.planta_nombre_cientifico}</p>
            <p><strong>Enfermedad:</strong> {resultado.enfermedad}</p>
            <p><strong>Nombre científico de la enfermedad:</strong> {resultado.enfermedad_nombre_cientifico}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticoEnfermedades;





