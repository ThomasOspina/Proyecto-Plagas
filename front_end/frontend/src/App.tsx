import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/adminDashboard/NavbarAdmin';
import Sidebar from './components/adminDashboard/SidebarAdmin';
import UserTable from './components/adminDashboard/UserTableAdmin';
import UserForm from './components/adminDashboard/UserFormAdmin';
import Statistics from './components/adminDashboard/StatisticsAdmin';
import Settings from './components/adminDashboard/SettingsAdmin';
import LoginForm from './components/LoginForm'; 
import Lotes from './components/tecnicoDashboard/verLotes';
import Siembras from './components/tecnicoDashboard/verSiembras';
import Tratamientos from './components/tecnicoDashboard/tratamiento';
import Informes from './components/tecnicoDashboard/informes';
import NavbarTecnico from './components/tecnicoDashboard/navbarTecnico';
import SidebarTecnico from './components/tecnicoDashboard/sidebarTecnico';
import GestionLotes from './components/tecnicoDashboard/gestionLotes';
import CampesinoView from './components/vistaCampesino/CampesinoView'; // ruta para la vista del campesino
import LoginCampesino from './components/vistaCampesino/LoginCampesino'; // ruta para el login del campesino

import './App.css';

const App: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'tecnico' | null>(null);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleLoginSuccess = (role: 'admin' | 'tecnico') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Routes>
        {/* Vista pública para Campesino */}
        <Route path="/campesino-login" element={<LoginCampesino />} />
        <Route path="/campesino" element={<CampesinoView />} />


        {/* Vistas protegidas: Admin y Técnico */}
        {!isLoggedIn ? (
          <Route path="*" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        ) : userRole === 'admin' ? (
          <Route
            path="*"
            element={
              <>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="main-container">
                  <Sidebar isActive={sidebarActive} onLogout={() => setIsLoggedIn(false)} />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Statistics />} />
                      <Route path="/usuarios" element={<UserTable />} />
                      <Route path="/agregar-usuario" element={<UserForm />} />
                      <Route path="/estadisticas" element={<Statistics />} />
                      <Route path="/ajustes" element={<Settings />} />
                      <Route path="/informes" element={<Informes />} />
                    </Routes>
                  </div>
                </div>
              </>
            }
          />
        ) : (
          <Route
            path="*"
            element={
              <>
                <NavbarTecnico toggleSidebar={toggleSidebar} />
                <div className="main-container">
                  <SidebarTecnico isActive={sidebarActive} onLogout={() => setIsLoggedIn(false)} />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Lotes />} />
                      <Route path="/gestionLotes" element={<GestionLotes />} />
                      <Route path="/siembras" element={<Siembras />} />
                      <Route path="/tratamientos" element={<Tratamientos />} />
                      <Route path="/informes" element={<Informes />} />
                      <Route path="/ajustes" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
              </>
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
