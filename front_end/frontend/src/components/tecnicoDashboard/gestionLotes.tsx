import React, { useState } from 'react';
import { crearGestionLote } from '../../api/gestionLotes'; // Ajusta la ruta si es necesario

const GestionLotes: React.FC = () => {
  const [estado, setEstado] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearGestionLote({ fecha_gestion: fecha, estado_lote: estado });
      alert('✅ Gestión guardada exitosamente');
      setEstado('');
      setFecha('');
    } catch (error: any) {
      alert(`❌ Error al guardar gestión: ${error.message}`);
    }
  };

  return (
    <section>
      <h2>Gestión de Lotes</h2>
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
    </section>
  );
};

export default GestionLotes;


