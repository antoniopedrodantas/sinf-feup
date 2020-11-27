import React from 'react';

import SideBar from '../../components/SideBar';
import './styles/Sales.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'

const Sales: React.FC = () => {
  return (
    <>
      <div className="frame"> 

        <input type="checkbox" id="menu"></input>
        <div className="toggle-menu">
          <div className="tempura"> Tempura</div>
          <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
        </div>

        <div className="row h-100">
          <div className="left-side col-md-2">
              <SideBar coreview="sales"/>
          </div>
          <div className="right-side col-md-10">
            SALES: All the other content should be placed here
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
