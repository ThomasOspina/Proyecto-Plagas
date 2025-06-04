import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isActive: boolean;
  onLogout: () => void;
}

const SidebarTecnico: React.FC<SidebarProps> = ({ isActive, onLogout }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <ul>
        <li>
          <Link
            to="/tecnico"
            className={location.pathname === '/tecnico' ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" ry="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1" ry="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1" ry="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
            </svg>
            Ver Lotes
          </Link>
        </li>
        <li>
          <Link
            to="/tecnico/gestionLotes"
            className={location.pathname === '/tecnico/gestionLotes' ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Gestionar Lotes
          </Link>
        </li>
        <li>
          <Link
            to="/tecnico/siembras"
            className={location.pathname === '/tecnico/siembras' ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C12 6 8 10 4 10C4 6 8 2 12 2Z"></path>
              <path d="M12 2C12 6 16 10 20 10C20 6 16 2 12 2Z"></path>
              <line x1="12" y1="10" x2="12" y2="22"></line>
              <path d="M9 18h6"></path>
            </svg>
            Ver Siembras
          </Link>
        </li>
        <li>
          <Link
            to="/tecnico/tratamientos"
            className={location.pathname === '/tecnico/tratamientos' ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M16 14l-2 2-2-2"></path>
            </svg>
            Tratamientos
          </Link>
        </li>
        <li>
          <Link
            to="/tecnico/informes"
            className={location.pathname === '/tecnico/informes' ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h12v16H4z"></path>
              <line x1="8" y1="8" x2="12" y2="8"></line>
              <line x1="8" y1="12" x2="12" y2="12"></line>
            </svg>
            Ver Informes
          </Link>
        </li>
        <li>
          <Link
            to="/tecnico/ajustes"
            className={location.pathname === '/tecnico/ajustes' ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Configuracion
          </Link>
        </li>
        <li>
          <button className="logout-btn" onClick={onLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarTecnico;

