
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

import axios, { AxiosResponse } from 'axios';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const Financial: React.FC = () => {

  // financial components
  const [balanceSheet, setBalanceSheet] = useState(
    {
      "Assets": {
        "Non Current Assets": {
          "Tangible Fixed Assets": 0,
          "Investment Properties": 0,
          "Goodwill": 0,
          "Intangible Assets": 0,
          "Biologic Assets": 0,
          "Financial Holdings": 0,
          "Other Financial Investments": 0,
          "Accounts Receivable": 0,
          "Deferred Tax Assets": 0,
          "Financial Investments": 0,
          "Credits and Other Non-Current Assets": 0,
          "Sum": 0
        },
        "Current Assets": {
          "Inventory": 0,
          "Biologic Assets": 0,
          "Clients": 0,
          "Government and Other Public Entities": 0,
          "Subscribed and Unpaid Capital": 0,
          "Other Accounts Receivable": 0,
          "Deferrals": 0,
          "Financial Assets Held for Trading": 0,
          "Other Financial Assets": 0,
          "Non-Current Assets Held for Sale": 0,
          "Other Current Assets": 0,
          "Cash and Bank Deposits": 0,
          "Sum": 0
        },
        "Total Assets": 0
      },
      "Liabilities": {
        "Non Current Liabilities": {
            "Provisions": 0,
            "Financing Obtained": 0,
            "Responsibilities for Post-Employment Benefits": 0,
            "Deferred Tax Liabilities": 0,
            "Accounts Payable": 0,
            "Sum": 0
        },
        "Current Liabilities": {
            "Suppliers": 0,
            "Client Advances": 0,
            "Government and Other Public Entities": 0,
            "Financing Obtained": 0,
            "Other Accounts Payable": 0,
            "Deferrals": 0,
            "Financial Liabilities Held for Trading": 0,
            "Other Financial Liabilities": 0,
            "Non-Current Liabilities Held for Sale": 0,
            "Other Current Liabilities": 0,
            "Sum": 0
        },
        "Total Liabilities": 0
      },
      "Equity": {
        "Equity": {
            "Subscribed Capital": 0,
            "Shares": 0,
            "Other Equity Instruments": 0,
            "Issue Premiums": 0,
            "Legal Reserves": 0,
            "Other Reserves": 0,
            "Transited Results": 0,
            "Revaluation Surpluses": 0,
            "Adjustments/Other Changes in Equity": 0,
            "Net Income for the Period": 0,
            "Anticipated Dividends": 0
        },
        "Total Equity": 0
      }
    }
  );
  const [resultsDemonstration, setResultsDemonstration] = useState(
    {
      "Sales and Services": 0,
      "Operating Subsidies": 0,
      "Imputed Gains/Losses of Subsidiaries, Associates and Joint Ventures": 0,
      "Variation in Production Inventories": 0,
      "Work for Own Entity": 0,
      "Cost of Goods Sold and Materials Consumed": 0,
      "Supplies and External Services": 0,
      "Personnel Expenses": 0,
      "Impairment (Losses/Reversals)": 0,
      "Impairment/Inventory Adjustments (Losses/Reversals)": 0,
      "Impairment of Accounts Receivable (Losses/Reversals)": 0,
      "Provisions (Increases/Decreases)": 0,
      "Impairment of Non-Depreciable/Amortizable Investments (Losses/Reversals)": 0,
      "Other Impairments (Losses/Reversals)": 0,
      "Fair Value Increases/Decreases": 0,
      "Other Income": 0,
      "Other Expenses": 0,
      "Income Before Depreciation, Financing Expenses and Taxes": 0,
      "Depreciation and Amortization Expenses/Reversals": 0,
      "Impairment of Depreciable/Amortizable Investments (Losses/Reversals)": 0,
      "Operating Income (Before Financing Expenses and taxes)": 0,
      "Interest and Similar Income Obtained": 0,
      "Interest and Similar Expenses Incurred": 0,
      "Income Before Taxes": 0,
      "Tax Over the Period's Income": 0,
      "Net Income for the Period": 0,
      "Result of Discontinued Activities (Net of Taxes) Included in Net Income for the Period": 0
    }
  );

  const history = useHistory();

  // checks for authentication
  useEffect(() => {
    (async () => {

      // gets auth-token from the local storage
      const token = localStorage.getItem("auth-token");

      // token is not null
      if(token != null){

        try{

          // gets data from token
          // TODO: change secret and add to a .env file possibly
          const data = jwt.verify(token, 'secret');

          // gets user id from user
          const { id } = data as TokenPayload;

          // TODO: maybe do something with id later on
          console.log("User ID: ", id);

        } catch(err) {
          history.push('/login');
        }

      }
      else{
        // redirects to login
        history.push('/login');
      }

      // gets balance sheet info
      await axios.get(`http://localhost:8000/balance_sheet?start_date=2018-12-31 00:00:00&end_date=2020-01-01 00:00:00`, {
              headers: { 'authorization': token },
            }).then((res) => {
              setBalanceSheet(res.data);
            }).catch((err) => {
              console.log(err);
            });

      // gets results demonstration
      await axios.get(`http://localhost:8000/results_demonstration?start_date=2018-12-31 00:00:00&end_date=2020-01-01 00:00:00`, {
              headers: { 'authorization': token },
            }).then((res) => {
              setResultsDemonstration(res.data["Income and Expenses"]);
              console.log(res.data);
            }).catch((err) => {
              console.log(err);
            });

    })();

  }, []);

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

  let infoCurrentAssets = getCurrentAssetsFromJSON(balanceSheet);
  let infoNonCurrentAssets = getNonCurrentAssetsFromJSON(balanceSheet);
  let infoTotalAssets = getTotalAssetsFromJSON(balanceSheet);

  let infoCurrentLiabilities = getCurrentLiabilitiesFromJSON(balanceSheet);
  let infoNonCurrentLiabilities = getNonCurrentLiabilitiesFromJSON(balanceSheet);
  let infoTotalLiabilities = getTotalLiabilitiesFromJSON(balanceSheet);

  let infoEquity = getEquityFromJSON(balanceSheet);
  let infoTotalEquity = getTotalEquityFromJSON(balanceSheet);

  let infoILS = getArrayFromJSON(resultsDemonstration);

 

  const types =["text","money"];

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