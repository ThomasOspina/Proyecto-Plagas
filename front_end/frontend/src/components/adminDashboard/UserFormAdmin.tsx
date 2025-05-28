// UserFormAdmin.tsx
import React, { useState } from 'react';
import { crearUsuario, obtenerUsuarios } from '../../api/usuarios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    rol: '',
    contraseña: '',
    cedula: ''
  });

  // Función para ver todos los usuarios
  const verUsuarios = async () => {
    try {
      const usuarios = await obtenerUsuarios();
      console.table(usuarios); // Muestra una tabla bonita en la consola
      alert(`📋 Se encontraron ${usuarios.length} usuarios. Revisa la consola (F12) para ver los detalles.`);
    } catch (error: any) {
      console.error('❌ Error al obtener usuarios:', error);
      alert(`Error al obtener usuarios: ${error.message}`);
    }
  };

  // Función para llenar datos de prueba únicos
  const llenarDatosPrueba = () => {
    const timestamp = Date.now(); // Para hacer datos únicos
    setFormData({
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: `juan.perez.${timestamp}@email.com`, // Email único
      telefono: '1234567890',
      rol: 'admin', // o el rol que uses en tu sistema
      contraseña: '123456789',
      cedula: `${timestamp.toString().slice(-8)}` // Cédula única
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    const camposVacios = Object.entries(formData).filter(([key, value]) => !value.trim());
    if (camposVacios.length > 0) {
      alert(`❌ Por favor llena todos los campos: ${camposVacios.map(([key]) => key).join(', ')}`);
      return;
    }

    try {
      console.log('🚀 Intentando crear usuario...');
      const usuarioCreado = await crearUsuario(formData);
      alert('✅ Usuario creado exitosamente');
      console.log('Usuario creado:', usuarioCreado);
      
      // Limpiar el formulario después de crear el usuario
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        rol: '',
        contraseña: '',
        cedula: ''
      });
    } catch (error: any) {
      console.error('❌ Error al crear usuario:', error);
      alert(`Error al crear usuario: ${error.message}`);
    }
  };

  return (
    <div>
      <div style={{marginBottom: '10px'}}>
        <button onClick={llenarDatosPrueba} style={{marginRight: '10px', background: '#007bff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px'}}>
          🔧 Llenar datos de prueba
        </button>
        
        <button onClick={verUsuarios} style={{background: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px'}}>
          👥 Ver todos los usuarios
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
      <input
        type="text"
        name="rol"
        placeholder="Rol"
        value={formData.rol}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        value={formData.contraseña}
        onChange={handleChange}
        required
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