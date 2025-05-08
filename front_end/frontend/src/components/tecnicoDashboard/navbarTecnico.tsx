import React from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const NavbarTecnico: React.FC<NavbarProps> = ( ) => {
  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Tecnico</h1>
      </div>
    </nav>
  );
};

export default NavbarTecnico;