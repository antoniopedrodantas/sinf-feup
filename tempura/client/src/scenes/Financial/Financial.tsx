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

  const jsonBS = {
    "Assets": {
        "Non Current Assets": {
            "Tangible Fixed Assets": "198263",
            "Investment Properties": "198263",
            "Goodwill": "198263",
            "Intangible Assets": "198263",
            "Biologic Assets": "198263",
            "Financial Holdings": "198263",
            "Other Financial Investments": "198263",
            "Accounts Receivable": "198263",
            "Deferred Tax Assets": "198263",
            "Financial Investments": "198263",
            "Credits and Other Non-Current Assets": "198263",
            "Sum": "182763"
        },
        "Current Assets": {
            "Inventory": "198263",
            "Biologic Assets": "198263",
            "Clients": "198263",
            "Government and Other Public Entities": "198263",
            "Subscribed and Unpaid Capital": "198263",
            "Other Accounts Receivable": "198263",
            "Deferrals": "198263",
            "Financial Assets Held for Trading": "198263",
            "Other Financial Assets": "198263",
            "Non-Current Assets Held for Sale": "198263",
            "Other Current Assets": "198263",
            "Cash and Bank Deposits": "198263",
            "Sum": "198263",

        },
        "Total Assets": "12312"
    },
    "Liabilities": {
        "Non Current Liabilities": {
            "Provisions": "198263",
            "Financing Obtained": "198263",
            "Responsibilities for Post-Employment Benefits": "198263",
            "Deferred Tax Liabilities": "198263",
            "Accounts Payable": "198263",
            "Sum": "182763"
        },
        "Current Liabilities": {
            "Suppliers": "198263",
            "Client Advances": "198263",
            "Government and Other Public Entities": "198263",
            "Financing Obtained": "198263",
            "Other Accounts Payable": "198263",
            "Deferrals": "198263",
            "Financial Liabilities Held for Trading": "198263",
            "Other Financial Liabilities": "198263",
            "Non-Current Liabilities Held for Sale": "198263",
            "Other Current Liabilities": "198263",
            "Sum": "198263",

        },
        "Total Liabilities": "12312"
    },
    "Equity":{
        "Equity":{
            "Subscribed Capital": "198263",
            "Shares": "198263",
            "Other Equity Instruments": "198263",
            "Issue Premiums": "198263",
            "Legal Reserves": "198263",
            "Other Reserves": "198263",
            "Transited Results": "198263",
            "Revaluation Surpluses": "198263",
            "Adjustments/Other Changes in Equity": "198263",
            "Net Income for the Period": "198263",
            "Anticipated Dividends": "198263"
        },
        "Total Equity": "12312"  }};

  const jsonILS = {
    "Sales and Services": "12314",
    "Operating Subsidies": "12314",
    "Imputed Gains/Losses of Subsidiaries, Associates and Joint Ventures": "12314",
    "Variation in Production Inventories": "12314",
    "Work for Own Entity": "12314",
    "Cost of Goods Sold and Materials Consumed": "12314",
    "Supplies and External Services": "12314",
    "Personnel Expenses": "12314",
    "Impairment (Losses/Reversals)": "12314",
    "Impairment/Inventory Adjustments (Losses/Reversals)": "12314",
    "Impairment of Accounts Receivable (Losses/Reversals)": "12314",
    "Provisions (Increases/Decreases)": "12314",
    "Impairment of Non-Depreciable/Amortizable Investments (Losses/Reversals)": "12314",
    "Other Impairments (Losses/Reversals)": "12314",
    "Fair Value Increases/Decreases": "12314",
    "Other Income": "12314",
    "Other Expenses": "12314",
    "Income Before Depreciation, Financing Expenses and Taxes": "12314",
    "Depreciation and Amortization Expenses/Reversals": "12314",
    "Impairment of Depreciable/Amortizable Investments (Losses/Reversals)": "12314",
    "Operating Income (Before Financing Expenses and taxes)": "12314",
    "Interest and Similar Income Obtained": "12314",
    "Interest and Similar Expenses Incurred": "12314",
    "Income Before Taxes": "12314",
    "Tax Over the Period's Income": "12314",
    "Net Income for the Period": "12314",
    "Result of Discontinued Activities (Net of Taxes) Included in Net Income for the Period": "12314"
}

  const [showDatePicker, setShowDatePicker] = useState(false);

  function getCurrentAssetsFromJSON(json_data: any){
    var currentAssets =  getArrayFromJSON(json_data["Assets"]["Current Assets"]);
    return currentAssets;
  }

  function getNonCurrentAssetsFromJSON(json_data: any){
    var nonCurrentAssets =  getArrayFromJSON(json_data["Assets"]["Non Current Assets"]);
    return nonCurrentAssets;
  }

  function getTotalAssetsFromJSON(json_data: any){
    var totalAssets =  json_data["Assets"]["Total Assets"];
    return totalAssets;
  }

  function getCurrentLiabilitiesFromJSON(json_data: any){
    var currentLiabilities =  getArrayFromJSON(json_data["Liabilities"]["Current Liabilities"]);
    return currentLiabilities;
  }

  function getNonCurrentLiabilitiesFromJSON(json_data: any){
    var nonCurrentLiabilities =  getArrayFromJSON(json_data["Liabilities"]["Non Current Liabilities"]);
    return nonCurrentLiabilities;
  }

  function getTotalLiabilitiesFromJSON(json_data: any){
    var totalLiabilities =  json_data["Liabilities"]["Total Liabilities"];
    return totalLiabilities;
  }

  function getEquityFromJSON(json_data: any){
    var nonCurrentLiabilities =  getArrayFromJSON(json_data["Equity"]["Equity"]);
    return nonCurrentLiabilities;
  }

  function getTotalEquityFromJSON(json_data: any){
    var totalLiabilities =  json_data["Equity"]["Total Equity"];
    return totalLiabilities;
  }


  function getArrayFromJSON(json_data: any) {
    var result =[];

    for(var i in json_data)
      result.push([i, json_data [i]]);

    return result;

  }

  let infoCurrentAssets = getCurrentAssetsFromJSON(jsonBS);
  let infoNonCurrentAssets = getNonCurrentAssetsFromJSON(jsonBS);
  let infoTotalAssets = getTotalAssetsFromJSON(jsonBS);

  let infoCurrentLiabilities = getCurrentLiabilitiesFromJSON(jsonBS);
  let infoNonCurrentLiabilities = getNonCurrentLiabilitiesFromJSON(jsonBS);
  let infoTotalLiabilities = getTotalLiabilitiesFromJSON(jsonBS);

  let infoEquity = getEquityFromJSON(jsonBS);
  let infoTotalEquity = getTotalEquityFromJSON(jsonBS);

  let infoILS = getArrayFromJSON(jsonILS);

 

  const types =["text","money"];



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
            
            <div className="right-body right-div">

            <div className="financial-content">

              <div className="date-selection date-selection-financial">
                  <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                    {showDatePicker ? "Hide" : "Date Picker"}
                  </Button>
                  {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
              </div>

            <div className = "row h-90 row-financial">
                <div className="tb-bs col-md-6">
                  <BalanceSheet currentAssets={infoCurrentAssets} nonCurrentAssets={infoNonCurrentAssets} currentLiabilities={infoCurrentLiabilities} nonCurrentLiabilities={infoNonCurrentLiabilities} assetsTotal={infoTotalAssets} liabilitiesTotal={infoTotalLiabilities} equity={infoEquity} equityTotal={infoTotalEquity} types={types}/>
                </div>
                <div className="tb-ils col-md-6">
                  <IncomeLossStatement accounts={infoILS} types={types}/>
                </div>
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