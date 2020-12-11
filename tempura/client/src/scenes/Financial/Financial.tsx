import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeLossStatement from '../../components/IncomeLossStatement/IncomeLossStatement';
import Calendar from '../../components/Calendar/Calendar';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import SideBar from '../../components/SideBar/SideBar';
import './styles/Financial.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar} from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const Financial: React.FC = () => {

  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentassets1 = [
                  ["Cash","1,235"],
                  ["Clients","23,000"],
                  ["Tangible Fixed Assets", "64,390"],
                  ["Investment Properties","198,000"],
                  ["Intangible Assets","97,654"],
                  ["Inventory","32,770"],
                  ["Sum","32,770"]
                ];

  const noncurrentassets1 = [
                  ["Cash","1,235"],
                  ["Clients","23,000"],
                  ["Tangible Fixed Assets", "64,390"],
                  ["Investment Properties","198,000"],
                  ["Intangible Assets","97,654"],
                  ["Inventory","32,770"],
                  ["Sum","32,770"]
                ];

  const currentliabilities1 = [
                  ["Suppliers","44,200"],
                  ["Client Advances","76,500"],
                  ["Government and Other Public Entities", "90,600"],
                  ["Financing Obtained","88,500"],
                  ["Sum","32,770"]
                ];

  const noncurrentliabilities1 = [
                  ["Suppliers","44,200"],
                  ["Client Advances","76,500"],
                  ["Government and Other Public Entities", "90,600"],
                  ["Financing Obtained","88,500"],
                  ["Sum","32,770"]
                ];

  const equity1 = [
                  ["Subscribed Capital", "198263"],
                  ["Shares", "198263"],
                  ["Other Equity Instruments", "198263"],
                  ["Issue Premiums", "198263"],
                  ["Legal Reserves", "198263"]
                ];

  const liabilitiesTotal1 = "270,654";
  const assetsTotal1 = "404,560";
  const  equityTotal1 = "130,765";
  const types1 =["text","money"];

  const accounts1 =[
                      ["Personnel expenses","126,567"],
                      ["Purchases","65,987"],
                      ["Cost of sold goods","43,249"],
                      ["Supplies and external services","110,987"],
                      ["Sales and services provided","87,654"],
                      ["Income Before Taxes","45,324"],
                      ["Variation in production inventories","32,654"],
                      ["Work for own entity","12,345"],
                      ["Depreciation and amortization expenses","7,094"],
                      ["Net Income for the Period","92,546"]

                  ];

  const history = useHistory();

  // checks for authentication
  // useEffect(() => {

  //   // gets auth-token from the local storage
  //   const token = localStorage.getItem("auth-token");

  //   // token is not null
  //   if(token != null){

  //     try{

  //       // gets data from token
  //       // TODO: change secret and add to a .env file possibly
  //       const data = jwt.verify(token, 'secret');

  //       // gets user id from user
  //       const { id } = data as TokenPayload;

  //       // TODO: maybe do something with id later on
  //       console.log("User ID: ", id);

  //     } catch(err) {
  //       history.push('/login');
  //     }

  //   }
  //   else{
  //     // redirects to login
  //     history.push('/login');
  //   }

  // }, []);

  // Frontend

  return (
    <>
      <div className="frame"> 

        <input type="checkbox" id="menu" defaultChecked={true}></input>
        

        <div className="row h-100">
          <div className="left-side col-md-2">
              <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon"/></label>
              <SideBar coreview="financial"/>
          </div>
          <div className="right-side col-md-10 right-financial">
            <div className="toggle-menu">
              <div className="tempura"> Tempura</div>
              <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
            </div>
            <div className="date-selection date-selection-financial">
                  <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                    {showDatePicker ? "Hide" : "Date Picker"}
                  </Button>
                  {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
                </div>
            <div className="right-body">
            <div className = "components-fin row h-90">
      <div className="tb-bs col-md-6">
        <BalanceSheet currentAssets={currentassets1} nonCurrentAssets={noncurrentassets1} currentLiabilities={currentliabilities1} nonCurrentLiabilities={noncurrentliabilities1} assetsTotal={assetsTotal1} liabilitiesTotal={liabilitiesTotal1} equity={equity1} equityTotal={equityTotal1} types={types1}/>
      </div>
      <div className="tb-ils col-md-6">
        <IncomeLossStatement accounts={accounts1} types={types1}/>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
};
export default Financial;