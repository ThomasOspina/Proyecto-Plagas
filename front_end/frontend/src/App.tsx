// App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginCampesino from './components/vistaCampesino/LoginCampesino';
import CampesinoView from './components/vistaCampesino/CampesinoView';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import TecnicoDashboard from './components/tecnicoDashboard/TecnicoDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  // Carga inicial desde localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState<'admin' | 'tecnico' | null>(() => {
    const storedRole = localStorage.getItem('userRole');
    return storedRole === 'admin' || storedRole === 'tecnico' ? storedRole : null;
  });

  // Manejo del login
  const handleLoginSuccess = (role: 'admin' | 'tecnico') => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);

    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'tecnico') {
      navigate('/tecnico');
    }
  };

  // Manejo del logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/campesino-login" element={<LoginCampesino />} />
      <Route path="/campesino" element={<CampesinoView />} />

      {/* Admin privado */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
            <AdminDashboard onLogout={handleLogout} />
          </PrivateRoute>
        }
      />

      {/* Técnico privado */}
      <Route
        path="/tecnico/*"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['tecnico']}>
            <TecnicoDashboard onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;









