import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampesinoView.css';
import { crearMonitoreo, crearFotoMonitoreo } from '../../api/monitoreoPlagas';
import { obtenerSiembras } from '../../api/registroSiembra';
import { obtenerPlanes } from '../../api/tratamientos';

const CampesinoView: React.FC = () => {
  const [registroEnviado, setRegistroEnviado] = useState(false);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [siembras, setSiembras] = useState<any[]>([]);
  const [tratamientos, setTratamientos] = useState<any[]>([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState<number | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const siembrasData = await obtenerSiembras();
        const tratamientosData = await obtenerPlanes();
        setSiembras(siembrasData);
        setTratamientos(Array.isArray(tratamientosData) ? tratamientosData : tratamientosData.results || []);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };
    cargarDatos();
  }, []);

  const handleEnviar = async () => {
    if (!registroSeleccionado) {
      alert('Debe seleccionar un lote.');
      return;
    }

    if (imagenes.length === 0) {
      alert('Debe subir al menos una imagen.');
      return;
    }

    try {
      for (const img of imagenes) {
        await crearFotoMonitoreo(registroSeleccionado, img);
      }
      setRegistroEnviado(true);
      setImagenes([]);
      setTimeout(() => setRegistroEnviado(false), 3000);
    } catch (err: any) {
      alert(`❌ Error al registrar monitoreo con imagen: ${err.message}`);
    }
  };

  const handleSinAnomalias = async () => {
    if (!registroSeleccionado) {
      alert('Debe seleccionar un lote.');
      return;
    }

    try {
      await crearMonitoreo(registroSeleccionado, 'Sin anomalías', 'Ninguna observación registrada');
      setRegistroEnviado(true);
      setTimeout(() => setRegistroEnviado(false), 3000);
    } catch (err: any) {
      alert(`❌ Error al registrar sin anomalías: ${err.message}`);
    }
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
        <div className="campesino-center">
          <div className="selector-lote">
            <label htmlFor="registroSelect">Selecciona lote:</label>
            <select
              id="registroSelect"
              value={registroSeleccionado}
              onChange={(e) => setRegistroSeleccionado(Number(e.target.value))}
            >
              <option value="">-- Elige un lote --</option>
              {siembras.map((s) => (
                <option key={s.id_registro} value={s.id_registro}>
                  {`Lote ${s.numeroLote}`}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`upload-card drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <h2 className="upload-title">Sube tu imagen del cultivo</h2>

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
              <button className="secondary-button" onClick={handleSinAnomalias}>
                Sin anomalías
              </button>
            </div>

            {registroEnviado && (
              <div className="mensaje-exito">✔ Registro enviado correctamente</div>
            )}

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#e53935',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          <section className="info-section">
            <h2>Recomendaciones</h2>
            <ul>
              <li>Verifica que la imagen esté enfocada</li>
              <li>No uses el dispositivo en movimiento</li>
              <li>Usa luz natural para mejores resultados</li>
            </ul>
          </section>
        </div>

        <div className="table-container" style={{ marginTop: '40px' }}>
          <h3 className="table-title">💊 Planes de Tratamiento</h3>
          {tratamientos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tratamiento</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                </tr>
              </thead>
              <tbody>
                {tratamientos.map(plan => (
                  <tr key={plan.id_planificacion}>
                    <td>{plan.id_planificacion}</td>
                    <td>{plan.informetratamiento}</td>
                    <td>{plan.fecha_inicio}</td>
                    <td>{plan.fecha_fin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No hay planes de tratamiento.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CampesinoView;










