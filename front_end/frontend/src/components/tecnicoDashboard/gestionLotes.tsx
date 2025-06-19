import React, { useEffect, useState } from 'react';
import {
  crearGestionLote,
  obtenerGestiones,
  eliminarGestionLote,
  actualizarGestionLote,
} from '../../api/gestionLotes';

interface Gestion {
  id_gestion: number;
  fecha_gestion: string;
  estado_lote: string;
}

const GestionLotes: React.FC = () => {
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('');
  const [gestiones, setGestiones] = useState<Gestion[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [formData, setFormData] = useState<Gestion | null>(null);

  useEffect(() => {
    cargarGestiones();
  }, []);

  const cargarGestiones = async () => {
    try {
      const data = await obtenerGestiones();
      setGestiones(data);
    } catch (error) {
      console.error('Error al cargar gestiones:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearGestionLote({ fecha_gestion: fecha, estado_lote: estado });
      alert('✅ Gestión guardada exitosamente');
      setFecha('');
      setEstado('');
      cargarGestiones();
    } catch (error: any) {
      alert(`❌ Error al guardar gestión: ${error.message}`);
    }
  };

  const handleEdit = (gestion: Gestion) => {
    setEditando(gestion.id_gestion);
    setFormData(gestion);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData) return;
    try {
      await actualizarGestionLote(formData.id_gestion, formData);
      setEditando(null);
      cargarGestiones();
    } catch (error) {
      console.error('Error al actualizar gestión:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta gestión?')) return;
    try {
      await eliminarGestionLote(id);
      cargarGestiones();
    } catch (error) {
      console.error('Error al eliminar gestión:', error);
    }
  };

  return (
    <section>
      <h2>🌾 Registrar Gestión de Lote</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <select
          name="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="">Selecciona un estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="tratamiento">En tratamiento</option>
        </select>
        <button type="submit">Guardar</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>📋 Lista de Gestiones</h2>
      {gestiones.length === 0 ? (
        <p>No hay gestiones registradas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#eee' }}>
            <tr>
              <th>Fecha</th>
              <th>Estado</th>
              <th>⚙️</th>
            </tr>
          </thead>
          <tbody>
            {gestiones.map((gestion) => (
              <tr key={gestion.id_gestion}>
                <td>
                  {editando === gestion.id_gestion ? (
                    <input
                      type="date"
                      name="fecha_gestion"
                      value={formData?.fecha_gestion || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    gestion.fecha_gestion
                  )}
                </td>
                <td>
                  {editando === gestion.id_gestion ? (
                    <select
                      name="estado_lote"
                      value={formData?.estado_lote || ''}
                      onChange={handleChange}
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="tratamiento">En tratamiento</option>
                    </select>
                  ) : (
                    gestion.estado_lote
                  )}
                </td>
                <td>
                  {editando === gestion.id_gestion ? (
                    <>
                      <button
                        style={{ padding: '2px 6px', marginRight: '4px' }}
                        onClick={handleUpdate}
                        title="Guardar"
                      >
                        💾
                      </button>
                      <button
                        style={{ padding: '2px 6px' }}
                        onClick={() => setEditando(null)}
                        title="Cancelar"
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ padding: '2px 6px', marginRight: '4px' }}
                        onClick={() => handleEdit(gestion)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        style={{ padding: '2px 6px' }}
                        onClick={() => handleDelete(gestion.id_gestion)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default GestionLotes;



