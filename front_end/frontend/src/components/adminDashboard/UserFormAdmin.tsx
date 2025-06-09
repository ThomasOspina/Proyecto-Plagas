// src/components/UserFormAdmin.tsx
import React, { useState } from 'react';
import { crearUsuario } from '../../api/usuarios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    rol: '',
    password: '',
    cedula: ''
  });

  const llenarDatosPrueba = () => {
    const timestamp = Date.now();
    setFormData({
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: `juan.perez.${timestamp}@email.com`,
      telefono: '1234567890',
      rol: 'admin',
      password: '123456789',
      cedula: `${timestamp.toString().slice(-8)}`
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const camposVacios = Object.entries(formData).filter(([_, value]) => !value.trim());
    if (camposVacios.length > 0 && formData.rol !== 'campesino') {
      alert(`❌ Por favor llena todos los campos: ${camposVacios.map(([key]) => key).join(', ')}`);
      return;
    }

    try {
      console.log('🚀 Intentando crear usuario...');
      const usuarioCreado = await crearUsuario(formData);
      alert('✅ Usuario creado exitosamente');
      console.log('Usuario creado:', usuarioCreado);

      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        rol: '',
        password: '',
        cedula: ''
      });
    } catch (error: any) {
      console.error('❌ Error al crear usuario:', error);
      alert(`Error al crear usuario: ${error.message}`);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={llenarDatosPrueba}
          style={{
            marginRight: '10px',
            background: '#007bff',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '3px'
          }}
        >
          🔧 Llenar datos de prueba
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Selecciona un rol</option>
          <option value="admin">Admin</option>
          <option value="tecnico">Técnico</option>
          <option value="campesino">Campesino</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required={formData.rol !== 'campesino'}
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default UserForm;



