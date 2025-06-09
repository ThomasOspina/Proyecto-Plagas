// components/tecnicoDashboard/TecnicoDashboard.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarTecnico from './navbarTecnico';
import SidebarTecnico from './sidebarTecnico';

// Importa aquí las vistas hijas que usas
import VerLotes from './verLotes';
import GestionLotes from './gestionLotes';
import VerSiembras from './verSiembras';
import Tratamiento from './tratamiento';
import Informes from './informes';
import SettingsTecnico from './settingsTecnico';

interface TecnicoDashboardProps {
  onLogout: () => void;
}

const TecnicoDashboard: React.FC<TecnicoDashboardProps> = ({ onLogout }) => {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      <NavbarTecnico toggleSidebar={toggleSidebar} />
      <div className="main-container">
        <SidebarTecnico isActive={sidebarActive} onLogout={onLogout} />
        <div className="content">
          <Routes>
            <Route index element={<VerLotes />} />
            <Route path="gestionLotes" element={<GestionLotes />} />
            <Route path="siembras" element={<VerSiembras />} />
            <Route path="tratamientos" element={<Tratamiento />} />
            <Route path="informes" element={<Informes />} />
            <Route path="ajustes" element={<SettingsTecnico />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default TecnicoDashboard;






