import React from 'react';

import SideBar from '../../components/SideBar';
import './styles/Stock.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'

const Stock: React.FC = () => {
  return (
    <>
      <div className="frame"> 

        <input type="checkbox" id="menu" defaultChecked={true}></input>

        <div className="toggle-menu">
          <div className="tempura"> Tempura</div>
          <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
        </div>
        <div className="row h-100">
          <div className="left-side col-md-2">
              <SideBar coreview="stock"/>
          </div>
          <div className="right-side col-md-10">
            STOCK: All the other content should be placed here
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
