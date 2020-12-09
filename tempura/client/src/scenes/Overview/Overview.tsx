import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';

import SideBar from '../../components/SideBar/SideBar';
import Calendar from '../../components/Calendar/Calendar';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../components/CustomTable/CustomTable';
import LineChart from '../../components/Charts/LineChart';

import './styles/Overview.css';
import '../../common.css';


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

  const columns1 = ["Name", "Sold Units", "Price"];
  const types1 = ["text", "number", "money"];
  const values1 = [
      ["Sashimi", "150", "17.8"],
      ["Tempura", "121", "18.8"],
      ["Sushi", "103", "20.0"],
      ["Robata", "89", "9.2"]
  ];

  const labels2 = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
  const values2 = ["50", "40", "45", "30", "52", "30"];

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

                <div className="frame-top">

                  <div className="left-frame-top">
                    <SingleValueCard type="money" title="Total Profit" value={352100}/>
                    <SingleValueCard type="percentage" title="Liquidity" value={67.3}/>
                  </div>
                  
                  <div className="mid-frame-top">
                    <SingleValueCard type="money" title="Total Revenue" value={500309}/>
                    <SingleValueCard type="money" title="Total Costs" value={148209}/>
                  </div>
                  <CustomTable title="Top Selling Products" columns={columns1} type={types1} values={values1} />

                </div>

                <LineChart title="Revenue Growth" labels={labels2} data={values2}/>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
