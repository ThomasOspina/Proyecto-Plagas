import React, { useState } from 'react';


import './CampesinoView.css';

const CampesinoView = () => {
  const [registroEnviado, setRegistroEnviado] = useState(false);
  
    const handleEnviar = () => {
    setRegistroEnviado(true);
    setTimeout(() => setRegistroEnviado(false), 3000); // Oculta el mensaje después de 3 segundos
  };
  return (
    <div className="campesino-container">
      <header className="campesino-header">
        <div className="campesino-header-left">
          {/* SVG ICONO USER */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className="user-role">Campesino</span>
        </div>
      </header>

      <main className="campesino-main">
        <div className="camera-card">
          {/* SVG ICONO CÁMARA */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>

          <p className="camera-instruction">Captura la imagen del cultivo para analizar posibles anomalías</p>
          <button className="primary-button" onClick={handleEnviar}>ENVIAR</button>
          <button className="secondary-button">Sin anomalías</button>
                    {/* Mensaje de confirmación */}
          {registroEnviado && (
            <div className="mensaje-exito">✔ Registro enviado correctamente</div>
          )}
        </div>

        <section className="info-section">
          <h2>Recomendaciones</h2>
          <ul>
            <li>Verifica que la imagen esté enfocada</li>
            <li>No uses el dispositivo en movimiento</li>
            <li>Usa luz natural para mejores resultados</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CampesinoView;