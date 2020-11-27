import React, { Component } from 'react';
import './styles/SideBar.css';
const logo =  require("../assets/logo.svg")
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faChartLine, faCashRegister, faShoppingCart, faCoins, faWarehouse} from '@fortawesome/free-solid-svg-icons'

interface SideProps {
  coreview: string;
}

class SideBar extends Component<SideProps> {

  render() {
    const {coreview} = this.props
    let overviewItem="nav-item", salesItem="nav-item", purchasesItem="nav-item", financialItem="nav-item", stockItem="nav-item"
    let core = {coreview}.coreview

    if(!core.localeCompare("overview")){
      overviewItem="selected-item"
    }
    else if(!core.localeCompare("sales")){
      salesItem="selected-item"
    }
    else if(!core.localeCompare("purchases")){
      purchasesItem="selected-item"
    }
    else if(!core.localeCompare("financial")){
      financialItem="selected-item"
    }
    else{
      stockItem="selected-item"
    }
   
    return (
      <>
        <img id="left-logo" src={logo} alt="logo" />
        
        <button className="left-buttons"> 
          <span> <span className="import"><FontAwesomeIcon  icon={faFileImport} /></span >  <span className="spanText">Import File</span></span>
        </button>

        <nav className="nav-items">

          <a id="overview" className={overviewItem} href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faChartLine} size = 'lg'/></span> <span className="spanText">Overview</span>
          </a>

          <a id="sales" className={salesItem} href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faCashRegister} size = 'lg'/></span> <span className="spanText">Sales</span>
          </a>
          
          <a id="purchases" className={purchasesItem} href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faShoppingCart} size = 'lg'/></span> <span className="spanText">Purchases</span>
          </a>

          <a id="financial" className={financialItem} href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faCoins} size = 'lg'/></span> <span className="spanText">Financial</span>
          </a>

          <a id="stock" className={stockItem} href="#">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faWarehouse} size = 'lg'/></span> <span className="spanText">Stock</span>
          </a>

        </nav>

        <button className="left-buttons logout"> 
          <span> <FontAwesomeIcon icon={faSignOutAlt}/> <span className="spanText">Logout</span></span>
        </button>
    </>
    );

  }
}

export default SideBar;

{/* 
TODO:
- routes
- media queries
- toogle
- remove scroll bar from FireFox
*/}

