import React from 'react';
import './styles/SideBar.css';
const logo =  require("../assets/logo.svg")

{/* add icons to buttons */}
const SideBar: React.FC = () => {
  return (
    <>
      <div className="left-side">
        <img id="left-logo" src={logo} alt="logo" />
        
        <button className="left-buttons"> 
          <span> Import file</span>
        </button>

        <nav className="nav-items">

        </nav>

        <button className="left-buttons"> 
          <span> Logout</span>
        </button>
      </div>
    </>
  );
};

export default SideBar;
