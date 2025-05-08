import React from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ( ) => {
  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Administrador</h1>
      </div>
    </nav>
  );
};

export default Navbar;