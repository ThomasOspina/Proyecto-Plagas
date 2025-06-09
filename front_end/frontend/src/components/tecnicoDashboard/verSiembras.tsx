import React, { useState, useEffect } from 'react';
import { crearRegistroSiembra, obtenerSiembras } from '../../api/registroSiembra';
import { obtenerGestiones } from '../../api/gestionLotes';
import { obtenerUsuarios } from '../../api/usuarios';

interface SiembraFormData {
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

        console.log('Usuarios cargados:', usuariosData);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['cantidad_plantas', 'gestion', 'usuario'].includes(name)
        ? parseInt(value)
        : value,
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

  return (
    <section>
      <h2>Ver Siembras</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha de Siembra</th>
            <th>Cantidad de Plantas</th>
            <th>Tipo de Planta</th>
            <th>Ubicación</th>
            <th>Número de Lote</th>
          </tr>
        </thead>
        <tbody>
          {siembras.map((siembra, index) => (
            <tr key={index}>
              <td>{siembra.fecha_siembra}</td>
              <td>{siembra.cantidad_plantas}</td>
              <td>{siembra.tipo_planta}</td>
              <td>{siembra.ubicacion}</td>
              <td>{siembra.numeroLote}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="registrar-siembra">Registrar Nueva Siembra</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="fecha_siembra"
          value={formData.fecha_siembra}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cantidad_plantas"
          placeholder="Cantidad de Plantas"
          value={formData.cantidad_plantas}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo_planta"
          placeholder="Tipo de Planta"
          value={formData.tipo_planta}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="numeroLote"
          placeholder="Número de Lote"
          value={formData.numeroLote}
          onChange={handleChange}
          required
        />
        <select name="gestion" value={formData.gestion} onChange={handleChange} required>
          <option value="">Selecciona una Gestión</option>
          {gestiones.map((g) => (
            <option key={g.id_gestion} value={g.id_gestion}>
              {`Gestión ${g.id_gestion} - ${g.estado_lote}`}
            </option>
          ))}
        </select>
        <select name="usuario" value={formData.usuario} onChange={handleChange} required>
          <option value="">Selecciona un Usuario</option>
          {usuarios.map((u, i) => (
            <option key={u.id_usuario ?? i} value={u.id_usuario ?? i}>
              {u.nombre ?? JSON.stringify(u)}
            </option>
          ))}
        </select>
        <button type="submit">Registrar Siembra</button>
      </form>
    </section>
  );
};

export default VerSiembras;






