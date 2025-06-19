import React, { useEffect, useState } from 'react';
import {
  obtenerUsuariosPublicos,
  eliminarUsuario,
  actualizarUsuario,
} from '../../api/usuarios';

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
  correo: string;
  cedula: string;
}

const UserTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [formData, setFormData] = useState<Usuario | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await obtenerUsuariosPublicos();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleDelete = async (cedula: string) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await eliminarUsuario(cedula);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditando(usuario.id_usuario);
    setFormData(usuario);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData) return;
    try {
      await actualizarUsuario(formData.id_usuario, formData);
      setEditando(null);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div>
      <h2>📋 Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Correo</th>
              <th>⚙️</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>
                  {editando === usuario.id_usuario ? (
                    <input
                      type="text"
                      name="nombre"
                      value={formData?.nombre || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    usuario.nombre
                  )}
                </td>
                <td>
                  {editando === usuario.id_usuario ? (
                    <input
                      type="text"
                      name="apellido"
                      value={formData?.apellido || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    usuario.apellido
                  )}
                </td>
                <td>
                  {editando === usuario.id_usuario ? (
                    <input
                      type="text"
                      name="telefono"
                      value={formData?.telefono || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    usuario.telefono
                  )}
                </td>
                <td>{usuario.rol}</td>
                <td>
                  {editando === usuario.id_usuario ? (
                    <input
                      type="email"
                      name="correo"
                      value={formData?.correo || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    usuario.correo
                  )}
                </td>
                <td>
                  {editando === usuario.id_usuario ? (
                    <>
                      <button
                        style={{ padding: '2px 6px', marginRight: '4px' }}
                        onClick={handleUpdate}
                        title="Guardar"
                      >
                        💾
                      </button>
                      <button
                        style={{ padding: '2px 6px' }}
                        onClick={() => setEditando(null)}
                        title="Cancelar"
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ padding: '2px 6px', marginRight: '4px' }}
                        onClick={() => handleEdit(usuario)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        style={{ padding: '2px 6px' }}
                        onClick={() => handleDelete(usuario.cedula)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;




