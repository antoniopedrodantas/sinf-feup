import React, { Component, useState } from 'react';

import './styles/SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faChartLine, faCashRegister, faShoppingCart, faCoins, faWarehouse} from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom';
import { id } from 'date-fns/esm/locale';
const logo =  require("../../assets/logo.svg")


interface SideProps {
  coreview: string;
}

class SideBar extends Component<SideProps> {

  // logout redirect state
  state = { logout: null };

  render() {
    const {coreview} = this.props
    let overviewItem="nav-item", salesItem="nav-item", purchasesItem="nav-item", financialItem="nav-item", stockItem="nav-item"
    let core = {coreview}.coreview

    // redirects to the login page
    if (this.state.logout) {
      return <Redirect to="/login" />
    }
    
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
    else if(!core.localeCompare("stock")){
      stockItem="selected-item"
    }

    // Connection with Backend

    const logout = () => {

      // clears auth-token
      localStorage.clear();

      // tells the user needs to logout
      this.setState({ logout: true });
      
    };

    // Frontend
   
    return (
      <>
        <img id="left-logo" src={logo} alt="logo"/>
        
        <button className="left-buttons import"> 
          <span> <span className="import"><FontAwesomeIcon  icon={faFileImport} /></span> <span className="spanText">Import File</span></span>
        </button>

        <nav className="nav-items">

          <a id="overview" className={overviewItem} href="/overview">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faChartLine} size = 'lg'/></span> <span className="spanText">Overview</span>
          </a>

          <a id="sales" className={salesItem} href="/sales">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faCashRegister} size = 'lg'/></span> <span className="spanText">Sales</span>
          </a>
          
          <a id="purchases" className={purchasesItem} href="/purchases">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faShoppingCart} size = 'lg'/></span> <span className="spanText">Purchases</span>
          </a>

          <a id="financial" className={financialItem} href="/financial">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faCoins} size = 'lg'/></span> <span className="spanText">Financial</span>
          </a>

          <a id="stock" className={stockItem} href="/stock">
            <span className="nav-icon fa-layers fa-fw"><FontAwesomeIcon icon={faWarehouse} size = 'lg'/></span> <span className="spanText">Stock</span>
          </a>

        </nav>

        <button className="left-buttons logout" onClick={logout}> 
          <span> <FontAwesomeIcon icon={faSignOutAlt}/> <span className="spanText">Logout</span></span>
        </button>
     
    </>
    
    );

  }
}

export default SideBar;

{/* 
TODO:
- remove scroll bar from FireFox
- remove horizontal scroll 
- fix rightSide bug on mobile version
*/}

