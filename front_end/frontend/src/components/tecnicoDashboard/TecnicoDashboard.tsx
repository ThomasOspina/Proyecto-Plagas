// components/tecnicoDashboard/TecnicoDashboard.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarTecnico from './navbarTecnico';
import SidebarTecnico from './sidebarTecnico';

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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TecnicoDashboard;




