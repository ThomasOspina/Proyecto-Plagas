import React, { useState, useEffect } from 'react';
import {
  crearRegistroSiembra,
  obtenerSiembras,
  actualizarSiembra,
  eliminarSiembra,
} from '../../api/registroSiembra';
import { obtenerGestiones } from '../../api/gestionLotes';
import { obtenerUsuarios } from '../../api/usuarios';

interface SiembraFormData {
  id_registro?: number;
  fecha_siembra: string;
  cantidad_plantas: number;
  tipo_planta: string;
  ubicacion: string;
  numeroLote: string;
  gestion: number;
  usuario: number;
}

const VerSiembras: React.FC = () => {
  const [siembras, setSiembras] = useState<SiembraFormData[]>([]);
  const [gestiones, setGestiones] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [formData, setFormData] = useState<SiembraFormData>({
    fecha_siembra: '',
    cantidad_plantas: 0,
    tipo_planta: '',
    ubicacion: '',
    numeroLote: '',
    gestion: 0,
    usuario: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gestionesData, usuariosData, siembrasData] = await Promise.all([
          obtenerGestiones(),
          obtenerUsuarios(),
          obtenerSiembras(),
        ]);
        setGestiones(Array.isArray(gestionesData) ? gestionesData : []);
        setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
        setSiembras(Array.isArray(siembrasData) ? siembrasData : []);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['cantidad_plantas', 'gestion', 'usuario'].includes(name) ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nuevaSiembra = await crearRegistroSiembra(formData);
      alert('✅ Siembra registrada exitosamente');
      setSiembras([...siembras, nuevaSiembra]);
      setFormData({
        fecha_siembra: '',
        cantidad_plantas: 0,
        tipo_planta: '',
        ubicacion: '',
        numeroLote: '',
        gestion: 0,
        usuario: 0,
      });
    } catch (error: any) {
      alert(`❌ Error al registrar siembra: ${error.message}`);
    }
  };

  const handleEdit = (siembra: SiembraFormData) => {
    setEditando(siembra.id_registro!);
    setFormData(siembra);
  };

  const handleUpdate = async () => {
    if (!formData.id_registro) return;
    try {
      await actualizarSiembra(formData.id_registro, formData);
      setEditando(null);
      const updatedSiembras = await obtenerSiembras();
      setSiembras(updatedSiembras);
    } catch (error) {
      console.error('❌ Error al actualizar siembra:', error);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm('¿Eliminar esta siembra?')) return;
    try {
      await eliminarSiembra(id);
      setSiembras(siembras.filter((s) => s.id_registro !== id));
    } catch (error) {
      console.error('❌ Error al eliminar siembra:', error);
    }
  };

  return (
    <section>
      <h2>🌱 Registrar Nueva Siembra</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} required />
        <input type="number" name="cantidad_plantas" placeholder="Cantidad" value={formData.cantidad_plantas} onChange={handleChange} required />
        <input type="text" name="tipo_planta" placeholder="Tipo de Planta" value={formData.tipo_planta} onChange={handleChange} required />
        <input type="text" name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleChange} required />
        <input type="text" name="numeroLote" placeholder="Lote" value={formData.numeroLote} onChange={handleChange} required />
        <select name="gestion" value={formData.gestion} onChange={handleChange} required>
          <option value="">Selecciona una Gestión</option>
          {gestiones.map((g) => (
            <option key={g.id_gestion} value={g.id_gestion}>{`Gestión ${g.id_gestion}`}</option>
          ))}
        </select>
        <select name="usuario" value={formData.usuario} onChange={handleChange} required>
          <option value="">Selecciona un Usuario</option>
          {usuarios.map((u) => (
            <option key={u.id_usuario} value={u.id_usuario}>{u.nombre}</option>
          ))}
        </select>
        <button type="submit">Registrar Siembra</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>📋 Lista de Siembras</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#eee' }}>
          <tr>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Lote</th>
            <th>⚙️</th>
          </tr>
        </thead>
        <tbody>
          {siembras.map((s) => (
            <tr key={s.id_registro}>
              <td>
                {editando === s.id_registro ? (
                  <input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} />
                ) : (
                  s.fecha_siembra
                )}
              </td>
              <td>
                {editando === s.id_registro ? (
                  <input type="number" name="cantidad_plantas" value={formData.cantidad_plantas} onChange={handleChange} />
                ) : (
                  s.cantidad_plantas
                )}
              </td>
              <td>
                {editando === s.id_registro ? (
                  <input type="text" name="tipo_planta" value={formData.tipo_planta} onChange={handleChange} />
                ) : (
                  s.tipo_planta
                )}
              </td>
              <td>
                {editando === s.id_registro ? (
                  <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
                ) : (
                  s.ubicacion
                )}
              </td>
              <td>
                {editando === s.id_registro ? (
                  <input type="text" name="numeroLote" value={formData.numeroLote} onChange={handleChange} />
                ) : (
                  s.numeroLote
                )}
              </td>
              <td>
                {editando === s.id_registro ? (
                  <>
                    <button onClick={handleUpdate} style={{ padding: '2px 6px' }} title="Guardar">💾</button>
                    <button onClick={() => setEditando(null)} style={{ padding: '2px 6px' }} title="Cancelar">❌</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(s)} style={{ padding: '2px 6px' }} title="Editar">✏️</button>
                    <button onClick={() => handleDelete(s.id_registro)} style={{ padding: '2px 6px' }} title="Eliminar">🗑️</button>
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

export default VerSiembras;









