import React from 'react';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeLossStatement from '../../components/IncomeLossStatement/IncomeLossStatement';
import './styles/Financial.css';

export const Financial: React.FC = () => {

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

  return (
    <>
    <div className = "row h-100">
      <div className="tb1 col-md-6">
        <BalanceSheet currentAssets={currentassets1} nonCurrentAssets={noncurrentassets1} currentLiabilities={currentliabilities1} nonCurrentLiabilities={noncurrentliabilities1} assetsTotal={assetsTotal1} liabilitiesTotal={liabilitiesTotal1} equity={equity1} equityTotal={equityTotal1} types={types1}/>
      </div>
      <div className="tb1 col-md-6">
        <IncomeLossStatement accounts={accounts1} types={types1}/>
      </div>
    </div>
    </>
  ); 
};
export default Financial;