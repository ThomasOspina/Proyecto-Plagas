import React, { useState } from 'react';
import './CampesinoView.css';

const CampesinoView = () => {
  const [registroEnviado, setRegistroEnviado] = useState(false);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleEnviar = () => {
    setRegistroEnviado(true);
    setTimeout(() => setRegistroEnviado(false), 3000);
  };

  const handleSeleccionImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImagenes((prev) => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );
    setImagenes((prev) => [...prev, ...files]);
  };

  return (
    <div className="campesino-container">
      <header className="campesino-header">
        <div className="campesino-profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className="user-role">Campesino</span>
        </div>
      </header>

      <main className="campesino-main">
        <div
          className={`upload-card drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <h2 className="upload-title">Sube tu imágen del cultivo</h2>

          <label htmlFor="upload" className="upload-button">
            Cargar imágenes
            <input
              id="upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleSeleccionImagenes}
              style={{ display: 'none' }}
            />
          </label>

          <p className="upload-hint">o arrastra una imagen aquí</p>

          {imagenes.length > 0 && (
            <div className="preview-grid">
              {imagenes.map((img, index) => (
                <div key={index} className="preview-image">
                  <img src={URL.createObjectURL(img)} alt={`imagen-${index}`} />
                  <button
                    className="remove-button"
                    onClick={() =>
                      setImagenes((prev) => prev.filter((_, i) => i !== index))
                    }
                    title="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="button-group">
              <button className="primary-button" onClick={handleEnviar}>ENVIAR</button>
              <button className="secondary-button">Sin anomalías</button>
          </div>
          
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
