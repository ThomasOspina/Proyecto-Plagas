// App.tsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginCampesino from './components/vistaCampesino/LoginCampesino';
import CampesinoView from './components/vistaCampesino/CampesinoView';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import TecnicoDashboard from './components/tecnicoDashboard/TecnicoDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

// Importaciones de vistas del técnico
import VerLotes from './components/tecnicoDashboard/verLotes';
import GestionLotes from './components/tecnicoDashboard/gestionLotes';
import VerSiembras from './components/tecnicoDashboard/verSiembras';
import Tratamiento from './components/tecnicoDashboard/tratamiento';
import Informes from './components/tecnicoDashboard/informes';
import SettingsTecnico from './components/tecnicoDashboard/settingsTecnico';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'tecnico' | null>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (role: 'admin' | 'tecnico') => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'tecnico') {
      navigate('/tecnico');
    }
  };

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/campesino-login" element={<LoginCampesino />} />
      <Route path="/campesino" element={<CampesinoView />} />

      {/* Rutas protegidas para admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
            <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
          </PrivateRoute>
        }
      />

      {/* Rutas protegidas para técnico */}
      <Route
        path="/tecnico/*"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['tecnico']}>
            <TecnicoDashboard onLogout={() => setIsLoggedIn(false)} />
          </PrivateRoute>
        }
      >
        <Route index element={<VerLotes />} />
        <Route path="gestionLotes" element={<GestionLotes />} />
        <Route path="siembras" element={<VerSiembras />} />
        <Route path="tratamientos" element={<Tratamiento />} />
        <Route path="informes" element={<Informes />} />
        <Route path="ajustes" element={<SettingsTecnico />} />
      </Route>
    </Routes>
  );
};

export default App;







