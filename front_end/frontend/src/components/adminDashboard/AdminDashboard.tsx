// AdminDashboard.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './NavbarAdmin';
import Sidebar from './SidebarAdmin';
import UserTable from './UserTableAdmin';
import UserForm from './UserFormAdmin';
import Statistics from './StatisticsAdmin';
import Settings from './SettingsAdmin';
import VerInformesAdmin from './VerInformesAdmin';


// Define las props que recibe
interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-container">
        <Sidebar isActive={sidebarActive} onLogout={onLogout} />
        <div className="content">
          <Routes>
            <Route index element={<Statistics />} />
            <Route path="usuarios" element={<UserTable />} />
            <Route path="agregar-usuario" element={<UserForm />} />
            <Route path="estadisticas" element={<Statistics />} />
            <Route path="informes" element={<VerInformesAdmin />} />
            <Route path="ajustes" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

