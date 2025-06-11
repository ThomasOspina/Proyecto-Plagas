import React, { useEffect, useState } from 'react';
import { obtenerMonitoreoPlagas } from '../../api/monitoreoPlagas';
import { obtenerDiagnosticos } from '../../api/apiplagas';
import { obtenerPlanes } from '../../api/tratamientos';

const VerInformesAdmin: React.FC = () => {
  const [reportes, setReportes] = useState<any[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
  const [tratamientos, setTratamientos] = useState<any[]>([]);

  useEffect(() => {
    const normalizeArray = (data: any): any[] => {
      if (Array.isArray(data)) return data;
      if (data.results && Array.isArray(data.results)) return data.results;
      const arrays = Object.values(data).filter(v => Array.isArray(v));
      return arrays[0] || [];
    };

    const fetchData = async () => {
      try {
        const rep = await obtenerMonitoreoPlagas();
        const diag = await obtenerDiagnosticos();
        const trat = await obtenerPlanes();
        setReportes(normalizeArray(rep));
        setDiagnosticos(normalizeArray(diag));
        setTratamientos(normalizeArray(trat));
      } catch (error) {
        console.error('Error al cargar los informes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">📊 Informes del Sistema</h2>

      {/* Reportes de Monitoreo */}
      <div className="table-container">
        <h3 className="table-title">📝 Reportes de Monitoreo</h3>
        {reportes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reporte</th>
                <th>Observación</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map(rep => (
                <tr key={rep.id_monitoreo}>
                  <td>{rep.id_monitoreo}</td>
                  <td>{rep.reporte}</td>
                  <td>{rep.observacionAnomalia}</td>
                  <td>{rep.fecha_monitoreo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No hay reportes disponibles.</p>
        )}
      </div>

      {/* Diagnósticos */}
      <div className="table-container">
        <h3 className="table-title">🧪 Diagnósticos Realizados</h3>
        {diagnosticos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Planta</th>
                <th>Enfermedad</th>
              </tr>
            </thead>
            <tbody>
              {diagnosticos.map(diag => (
                <tr key={diag.id_api}>
                  <td>{diag.id_api}</td>
                  <td>{diag.nombrePlanta}</td>
                  <td>{diag.enfermedadPlanta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No hay diagnósticos registrados.</p>
        )}
      </div>

      {/* Tratamientos */}
      <div className="table-container">
        <h3 className="table-title">💊 Planes de Tratamiento</h3>
        {tratamientos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tratamiento</th>
                <th>Inicio</th>
                <th>Fin</th>
              </tr>
            </thead>
            <tbody>
              {tratamientos.map(plan => (
                <tr key={plan.id_planificacion}>
                  <td>{plan.id_planificacion}</td>
                  <td>{plan.informetratamiento}</td>
                  <td>{plan.fecha_inicio}</td>
                  <td>{plan.fecha_fin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No hay planes de tratamiento.</p>
        )}
      </div>
    </div>
  );
};

export default VerInformesAdmin;





