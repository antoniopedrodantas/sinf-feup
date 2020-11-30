import React , { useState }from 'react';
import {Transition} from 'react-transition-group';

import SideBar from '../../components/SideBar';
import './styles/Overview.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'

const Overview: React.FC = () => {

  const [activeMenu, setActiveMenu] = useState('main')
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
              <SideBar coreview="overview"/>
          </div>
          <div className="right-side col-md-10">
            OVERVIEW: All the other content should be placed here
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>test</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>test</p>   
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>test</p>
            <p>dfsfsdfdsfsdfsdf</p>
            <p>LAST test</p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
