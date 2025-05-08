import React, { useState } from 'react';

interface Siembra {
  fechaSiembra: string;
  cantidadPlantas: number;
  tipoPlanta: string;
  ubicacion: string;
  numeroLote: string;
}

const VerSiembras: React.FC = () => {
  const [siembras, setSiembras] = useState<Siembra[]>([]);
  const [formData, setFormData] = useState<Siembra>({
    fechaSiembra: '',
    cantidadPlantas: 0,
    tipoPlanta: 'Plátano',
    ubicacion: '',
    numeroLote: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSiembras([...siembras, formData]);
    setFormData({
      fechaSiembra: '',
      cantidadPlantas: 0,
      tipoPlanta: 'Plátano',
      ubicacion: '',
      numeroLote: '',
    });
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
              <td>{siembra.fechaSiembra}</td>
              <td>{siembra.cantidadPlantas}</td>
              <td>{siembra.tipoPlanta}</td>
              <td>{siembra.ubicacion}</td>
              <td>{siembra.numeroLote}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='registrar-siembra'>Registrar Nueva Siembra</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" name="fechaSiembra" value={formData.fechaSiembra} onChange={handleChange} required />
        <input type="number" name="cantidadPlantas" placeholder="Cantidad de Plantas" value={formData.cantidadPlantas} onChange={handleChange} required />
        <select name="tipoPlanta" value={formData.tipoPlanta} onChange={handleChange} required>
          <option value="Plátano">Plátano</option>
        </select>
        <input type="text" name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleChange} required />
        <input type="text" name="numeroLote" placeholder="Número de Lote" value={formData.numeroLote} onChange={handleChange} required />
        <button type="submit">Registrar Siembra</button>
      </form>
    </section>
  );
};

export default VerSiembras;