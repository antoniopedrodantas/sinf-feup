import React from 'react';
import './styles/SideBar.css';
const logo =  require("../assets/logo.svg")
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faChartLine, faCashRegister, faShoppingCart, faCoins, faWarehouse} from '@fortawesome/free-solid-svg-icons'

{/* add icons to buttons */}
const SideBar: React.FC = () => {
  return (
    <>
      <div className="left-side">
        <img id="left-logo" src={logo} alt="logo" />
        
        <button className="left-buttons"> 
          <span> <span className="import"><FontAwesomeIcon  icon={faFileImport} /></span> Import File</span>
        </button>

        <nav className="nav-items">
          <a id="overview" className="nav-item" href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faChartLine} size = 'lg'/></span> <span>Overview</span>
          </a>

          <a id="sales" className="nav-item" href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faCashRegister} size = 'lg'/></span> <span>Sales</span>
          </a>

          <a id="purchases" className="nav-item" href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faShoppingCart} size = 'lg'/></span> <span>Purchases</span>
          </a>

          <a id="financial" className="nav-item" href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faCoins} size = 'lg'/></span> <span>Financial</span>
          </a>

          <a id="stock" className="nav-item" href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faWarehouse} size = 'lg'/></span> <span>Stock</span>
          </a>

        </nav>

        <button className="left-buttons logout"> 
          <span> <FontAwesomeIcon icon={faSignOutAlt}/> Logout</span>
        </button>
      </div>
    </>
  );
};

export default SideBar;
