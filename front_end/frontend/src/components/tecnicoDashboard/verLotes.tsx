import React, { useState } from 'react';

interface Lote {
  numeroLote: string;
  descripcion: string;
  fechaCreacion: string;
  ubicacion: string;
  estado: string;
}

const VerLotes: React.FC = () => {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [formData, setFormData] = useState<Lote>({
    numeroLote: '',
    descripcion: '',
    fechaCreacion: '',
    ubicacion: '',
    estado: 'Activo',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLotes([...lotes, formData]);
    setFormData({
      numeroLote: '',
      descripcion: '',
      fechaCreacion: '',
      ubicacion: '',
      estado: 'Activo',
    });
  };

  return (
    <section>
      <h2>Ver Lotes</h2>
      <table>
        <thead>
          <tr>
            <th>Número de Lote</th>
            <th>Descripción</th>
            <th>Fecha de Creación</th>
            <th>Ubicación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((lote, index) => (
            <tr key={index}>
              <td>{lote.numeroLote}</td>
              <td>{lote.descripcion}</td>
              <td>{lote.fechaCreacion}</td>
              <td>{lote.ubicacion}</td>
              <td>{lote.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='registrar-lote'>Registrar Nuevo Lote</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="numeroLote" placeholder="Número de Lote" value={formData.numeroLote} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
        <input type="date" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} required />
        <input type="text" name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleChange} required />
        <select name="estado" value={formData.estado} onChange={handleChange} required>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit">Registrar Lote</button>
      </form>
    </section>
  );
};

export default VerLotes;
