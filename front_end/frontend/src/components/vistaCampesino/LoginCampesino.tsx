import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCampesino.css';

const LoginCampesino: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/usuarios/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Se envía un password vacío para que el backend no dé error
        body: JSON.stringify({ cedula, password: "" }),
      });

      const data = await response.json();

      if (response.ok && data.rol.toLowerCase() === 'campesino') {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('campesinoCedula', cedula);
        navigate('/campesino');
      } else {
        alert('Credenciales inválidas o no eres campesino');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Hubo un error al intentar ingresar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-campesino-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Ingreso Campesino</h2>

        <div className="input-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="input-icon">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75
              11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25
              2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25
              2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <input
            type="text"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginCampesino;

