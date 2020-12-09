import React, { useEffect, useState } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Calendar from '../../components/Calendar/Calendar';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';

import './styles/Overview.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Overview: React.FC = () => {

  const history = useHistory();

  // checks for authentication
  useEffect(() => {

    // gets auth-token from the local storage
    const token = localStorage.getItem("auth-token");

    // token is not null
    if(token != null){

      try{

        // gets data from token
        // TODO: change secret and add to a .env file possibly
        const data = jwt.verify(token, 'secret');
        const { id } = data as TokenPayload;

        // TODO: maybe do something with id later on
        console.log("User ID: ", id);

      } catch(err) {
        history.push('/login');
      }

    }
    else{
      history.push('/login');
    }

  }, []);

  // Frontend
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <div className="frame"> 

        <input type="checkbox" id="menu" defaultChecked={true}></input>

        <div className="row h-100">
          <div className="left-side col-md-2">
            <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon"/></label>
            <SideBar coreview="overview"/>
          </div>

          <div className="right-side col-md-10">
            <div className="toggle-menu">
              <div className="tempura"> Tempura</div>
              <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
            </div>
            <div className="right-body">
              <div className="overview-content">
                <div className="date-selection">
                  <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                    {showDatePicker ? "Hide" : "Date Picker"}
                  </Button>
                  {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
