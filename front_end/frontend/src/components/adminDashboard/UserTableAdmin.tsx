import React, { useEffect, useState } from 'react';

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
  correo: string;
}

const UserTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchedUsuarios = [
      { id_usuario: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123456789', rol: 'Admin', correo: 'juan@gmail.com' },
      { id_usuario: 2, nombre: 'Ana', apellido: 'Gómez', telefono: '987654321', rol: 'Tecnico', correo: 'ana@gmail.com' }
    ];
    setUsuarios(fetchedUsuarios);
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
