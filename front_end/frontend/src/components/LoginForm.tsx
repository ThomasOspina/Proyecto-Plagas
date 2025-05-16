import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Necesario para redireccionar
import '../styles/LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: (role: 'admin' | 'tecnico') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //  Hook de React Router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    if (cedula === '1234' && password === 'admin') {
      onLoginSuccess('admin');
    } else if (cedula === '5678' && password === 'tecnico') {
      onLoginSuccess('tecnico');
    } else {
      alert('Credenciales incorrectas');
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