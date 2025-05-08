import React, { useState } from 'react';

const UserForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Usuario creado exitosamente');
    setNombre('');
    setApellido('');
    setCorreo('');
    setTelefono('');
    setRol('');
    setPassword('');
  };

  return (
    <div>
      <h2>Agregar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>Correo:
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <label>Teléfono:
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>
        <label>Rol:
          <input type="text" value={rol} onChange={(e) => setRol(e.target.value)} />
        </label>
        <label>Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default UserForm;
