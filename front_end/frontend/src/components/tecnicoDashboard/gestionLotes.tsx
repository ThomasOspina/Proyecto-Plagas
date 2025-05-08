import React, { useState } from 'react';

const GestionLotes: React.FC = () => {
  const [estado, setEstado] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gestion guardada:\nFecha: ${fecha}\nEstado: ${estado}`);
    setEstado('');
    setFecha('');
  };

  return (
    <section>
      <h2>Gestion de Lotes</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <select name="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
};

export default GestionLotes;