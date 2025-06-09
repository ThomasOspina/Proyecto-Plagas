import React, { useEffect, useState } from 'react';
import { obtenerUsuariosPublicos } from '../../api/usuarios'; // ajusta la ruta según sea necesario

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
    const fetchUsuarios = async () => {
      const data = await obtenerUsuariosPublicos();
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>📋 Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
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
      )}
    </div>
  );
};

export default UserTable;


