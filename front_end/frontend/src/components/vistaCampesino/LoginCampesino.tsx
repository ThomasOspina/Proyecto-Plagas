import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampesinoView.css';

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
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginCampesino;