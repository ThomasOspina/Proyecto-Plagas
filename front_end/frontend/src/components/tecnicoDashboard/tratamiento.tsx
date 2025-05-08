import React, { useState } from 'react';

const Tratamiento: React.FC = () => {
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tratamiento planificado:\nFecha: ${fecha}\nDescripción: ${descripcion}`);
    setDescripcion('');
    setFecha('');
  };

  return (
    <section>
      <h2>Planificar Tratamiento</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input type="text" placeholder="Descripción del Tratamiento" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <button type="submit">Planificar Tratamiento</button>
      </form>
    </section>
  );
};

export default Tratamiento;