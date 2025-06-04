import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Necesario para redireccionar
import '../styles/LoginForm.css';
import { loginUsuario } from '../api/auth';

interface LoginFormProps {
  onLoginSuccess: (role: 'admin' | 'tecnico') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //  Hook de React Router



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = await loginUsuario(cedula, password);

    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('usuarioRol', data.rol);

    // Llama al callback por si se usa
    onLoginSuccess(data.rol.toLowerCase() as 'admin' | 'tecnico');

    // Redirige inmediatamente
    if (data.rol.toLowerCase() === 'admin') {
      navigate('/admin');
    } else if (data.rol.toLowerCase() === 'tecnico') {
      navigate('/tecnico');
    } else {
      alert('Rol no reconocido');
    }

  } catch (error: any) {
    alert(error.message || 'Error al iniciar sesión');
  }
};



  return (
    <section className="seccion-login">
      {/* Botón de acceso para campesino */}
      <button
        className="boton-campesino"
        onClick={() => navigate('/campesino-login')}
      >
        Campesino
      </button>
      
      <div className="contenedor-logo">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="contenedor-login">
        <form className="formulario-login" onSubmit={handleSubmit}>
          <h2 className="title">Iniciar Sesión</h2>
          <input
            className="input-cedula"
            type="text"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <input
            className="input-password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="boton-login">Ingresar</button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;