import React, { useState, useEffect } from 'react';
import { crearPlanTratamiento } from '../../api/tratamientos';
import { obtenerUsuarios } from '../../api/usuarios';
import { obtenerDiagnosticos } from '../../api/apiplagas';

interface Diagnostico {
  id_api: number;
  nombrePlanta: string;
  enfermedadPlanta: string;
  reporteFotos: number;
}

interface Usuario {
  id_usuario: number;
  nombre: string;
}

const Tratamiento: React.FC = () => {
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [informe, setInforme] = useState('');
  const [diagnosticoId, setDiagnosticoId] = useState<number | ''>('');
  const [usuarioId, setUsuarioId] = useState<number | ''>('');

  useEffect(() => {
    const normalizeArray = (data: any): any[] => {
      if (Array.isArray(data)) return data;
      if (data.results && Array.isArray(data.results)) return data.results;
      const arrays = Object.values(data).filter(v => Array.isArray(v));
      return arrays[0] || [];
    };

    const fetchDiagnosticos = async () => {
      try {
        const res = await obtenerDiagnosticos();
        const list = normalizeArray(res);
        setDiagnosticos(list);
      } catch (error) {
        console.error('Error al cargar diagnósticos:', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const list = await obtenerUsuarios();
        setUsuarios(list);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchDiagnosticos();
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosticoId || !usuarioId || !fechaInicio || !fechaFin || !informe) {
      alert('Completa todos los campos');
      return;
    }

    try {
      await crearPlanTratamiento({
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        informetratamiento: informe,
        api: Number(diagnosticoId),
        usuario: Number(usuarioId),
      });
      alert('✅ Tratamiento planificado');
      setFechaInicio('');
      setFechaFin('');
      setInforme('');
      setDiagnosticoId('');
      setUsuarioId('');
    } catch (err: any) {
      alert('❌ Error al guardar: ' + err.message);
    }
  };

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>🧪 Planificar Tratamiento</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Diagnóstico:</label>
        <select
          value={diagnosticoId}
          onChange={e => setDiagnosticoId(Number(e.target.value))}
          required
        >
          <option value="">Selecciona un diagnóstico</option>
          {diagnosticos.map(diag => (
            <option key={diag.id_api} value={diag.id_api}>
              {`Reporte #${diag.reporteFotos} - ${diag.nombrePlanta} - ${diag.enfermedadPlanta}`}
            </option>
          ))}
        </select>

        <label>Usuario responsable:</label>
        <select
          value={usuarioId}
          onChange={e => setUsuarioId(Number(e.target.value))}
          required
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map(user => (
            <option key={user.id_usuario} value={user.id_usuario}>
              {user.nombre}
            </option>
          ))}
        </select>

        <label>Fecha de inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={e => setFechaInicio(e.target.value)}
          required
        />

        <label>Fecha de fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={e => setFechaFin(e.target.value)}
          required
        />

        <label>Informe del tratamiento:</label>
        <textarea
          value={informe}
          onChange={e => setInforme(e.target.value)}
          rows={5}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
          placeholder="Describe el tratamiento aplicado..."
          required
        />

        <button type="submit" style={{
          marginTop: '10px',
          backgroundColor: '#2e7d32',
          color: 'white',
          padding: '10px 15px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Planificar
        </button>
      </form>
    </section>
  );
};

export default Tratamiento;










