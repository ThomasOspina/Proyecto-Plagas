import React from 'react';


interface Informe {
  fecha: string;
  descripcion: string;
  lote: string;
}

const Informes: React.FC = () => {
  const informes: Informe[] = [
    { fecha: '2025-05-01', descripcion: 'Sin plagas detectadas en el Lote 1.', lote: 'Lote 1' },
    { fecha: '2025-05-03', descripcion: 'Aplicación de tratamiento preventivo en Lote 2.', lote: 'Lote 2' },
    { fecha: '2025-05-04', descripcion: 'Revisión general. No se encontraron anomalías.', lote: 'Lote 3' },
  ];

  return (
    <div className="informes-container">
      <h2>Informes</h2>
      <table className="informe-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Lote</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {informes.map((informe, index) => (
            <tr key={index}>
              <td>{informe.fecha}</td>
              <td>{informe.lote}</td>
              <td>{informe.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Informes;


 
    