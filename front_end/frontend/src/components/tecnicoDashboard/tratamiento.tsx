import React, { useState, useEffect } from 'react';
import {
  crearPlanTratamiento,
  obtenerPlanes,
  eliminarPlan,
  actualizarPlan,
  PlanTratamiento
} from '../../api/tratamientos';
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
  const [planes, setPlanes] = useState<PlanTratamiento[]>([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [informe, setInforme] = useState('');
  const [diagnosticoId, setDiagnosticoId] = useState<number | ''>('');
  const [usuarioId, setUsuarioId] = useState<number | ''>('');
  const [editando, setEditando] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState<PlanTratamiento | null>(null);

  useEffect(() => {
    const normalizeArray = (data: any): any[] => {
      if (Array.isArray(data)) return data;
      if (data.results && Array.isArray(data.results)) return data.results;
      const arrays = Object.values(data).filter(v => Array.isArray(v));
      return arrays[0] || [];
    };

    const fetchAll = async () => {
      try {
        const [resDiag, resUsers, resPlanes] = await Promise.all([
          obtenerDiagnosticos(),
          obtenerUsuarios(),
          obtenerPlanes()
        ]);
        setDiagnosticos(normalizeArray(resDiag));
        setUsuarios(resUsers);
        setPlanes(normalizeArray(resPlanes));
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchAll();
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
      const res = await obtenerPlanes();
      setPlanes(res);
    } catch (err: any) {
      alert('❌ Error al guardar: ' + err.message);
    }
  };

  const handleEdit = (plan: PlanTratamiento) => {
    setEditando(plan.id_planificacion);
    setFormEdit(plan);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formEdit) return;
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formEdit) return;
    try {
      await actualizarPlan(formEdit.id_planificacion, formEdit);
      alert('✅ Tratamiento actualizado');
      setEditando(null);
      const res = await obtenerPlanes();
      setPlanes(res);
    } catch (error: any) {
      alert('❌ Error al actualizar: ' + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este tratamiento?')) return;
    try {
      await eliminarPlan(id);
      alert('🗑️ Tratamiento eliminado');
      const res = await obtenerPlanes();
      setPlanes(res);
    } catch (error: any) {
      alert('❌ Error al eliminar: ' + error.message);
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
        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required />

        <label>Fecha de fin:</label>
        <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required />

        <label>Informe del tratamiento:</label>
        <textarea
          value={informe}
          onChange={e => setInforme(e.target.value)}
          rows={6}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
          required
        />

        <button
          type="submit"
          style={{
            marginTop: '10px',
            backgroundColor: '#2e7d32',
            color: 'white',
            padding: '10px 15px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Planificar
        </button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>📋 Tratamientos Registrados</h2>
      <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead style={{ backgroundColor: '#eee' }}>
          <tr>
            <th style={{ width: '120px' }}>Inicio</th>
            <th style={{ width: '120px' }}>Fin</th>
            <th>Informe</th>
            <th style={{ width: '90px' }}>⚙️</th>
          </tr>
        </thead>
        <tbody>
          {planes.map(plan => (
            <tr key={plan.id_planificacion}>
              <td>
                {editando === plan.id_planificacion ? (
                  <input
                    type="date"
                    name="fecha_inicio"
                    value={formEdit?.fecha_inicio || ''}
                    onChange={handleEditChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  plan.fecha_inicio
                )}
              </td>
              <td>
                {editando === plan.id_planificacion ? (
                  <input
                    type="date"
                    name="fecha_fin"
                    value={formEdit?.fecha_fin || ''}
                    onChange={handleEditChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  plan.fecha_fin
                )}
              </td>
              <td>
                {editando === plan.id_planificacion ? (
                  <textarea
                    name="informetratamiento"
                    value={formEdit?.informetratamiento || ''}
                    onChange={handleEditChange}
                    rows={3}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                ) : (
                  <div style={{ maxHeight: '4.5em', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                    {plan.informetratamiento}
                  </div>
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {editando === plan.id_planificacion ? (
                  <>
                    <button onClick={handleUpdate} title="Guardar" style={{ marginRight: '4px' }}>💾</button>
                    <button onClick={() => setEditando(null)} title="Cancelar">❌</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(plan)} title="Editar" style={{ marginRight: '4px' }}>✏️</button>
                    <button onClick={() => handleDelete(plan.id_planificacion)} title="Eliminar">🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Tratamiento;














