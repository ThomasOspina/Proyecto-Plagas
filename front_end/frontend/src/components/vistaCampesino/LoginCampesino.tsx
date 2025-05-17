import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCampesino.css';

const LoginCampesino: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de credenciales fijas para el campesino
    if (cedula === '9999') {
      localStorage.setItem('campesinoCedula', cedula); // se puede validar esto luego si necesitas
      navigate('/campesino');
    } else {
      alert('Numero de cedula Incorrecto, por favor intente nuevamente');
      setCedula(''); // Limpiar el campo de cédula
    }
  };

  return (
    <div className="login-campesino-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Ingreso Campesino</h2>
        
                <div className="input-icon-wrapper">
          {/* SVG del candado */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="input-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginCampesino;