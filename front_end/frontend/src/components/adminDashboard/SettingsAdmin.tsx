import React, { useState } from "react";

const Settings: React.FC = () => {
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState("habilitadas");
  const [language, setLanguage] = useState("español");
  const [theme, setTheme] = useState("claro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Configuración guardada");
  };

  return (
    <div>
      <h2>Configuración</h2>
      <div className="settings-section">
        <div className="settings-item">
          <h3>Cambiar Contraseña</h3>
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="settings-item">
          <h3>Notificaciones</h3>
          <select
            value={notifications}
            onChange={(e) => setNotifications(e.target.value)}
          >
            <option value="habilitadas">Habilitadas</option>
            <option value="deshabilitadas">Deshabilitadas</option>
          </select>
        </div>

        <div className="settings-item">
          <h3>Idioma</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="español">Español</option>
            <option value="english">English</option>
          </select>
        </div>

        <div className="settings-item">
          <h3>Tema</h3>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Guardar Configuración</button>
      </div>
    </div>
  );
};

export default Settings;