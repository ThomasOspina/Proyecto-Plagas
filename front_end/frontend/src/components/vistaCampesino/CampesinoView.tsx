import React from 'react';

import './CampesinoView.css'; // Estilos personalizados

const CampesinoView = () => {
  return (
    <div className="campesino-container">
      <header className="campesino-header">
        <div className="profile-icon">👤</div>
        <span>Campesino</span>
      </header>

      <div className="camera-section">
        <button className="camera-button">
          <span role="img" aria-label="camera">📷</span>
        </button>
        <button className="send-button">ENVIAR</button>
        <div className="status-box">Sin anomalías</div>
      </div>
    </div>
  );
};

export default CampesinoView;