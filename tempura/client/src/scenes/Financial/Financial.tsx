import React from 'react';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeLossStatement from '../../components/IncomeLossStatement/IncomeLossStatement';
import './styles/Financial.css';

export const Financial: React.FC = () => {

  const assets1 = [
                  ["Cash","1,235"],
                  ["Clients","23,000"],
                  ["Tangible Fixed Assets", "64,390"],
                  ["Investment Properties","198,000"],
                  ["Intangible Assets","97,654"],
                  ["Inventory","32,770"]
                ];

  const liabilities1 = [
                  ["Suppliers","44,200"],
                  ["Client Advances","76,500"],
                  ["Government and Other Public Entities", "90,600"],
                  ["Financing Obtained","88,500"]
                ];

  const liabilitiesTotal1 = "270,654";
  const assetsTotal1 = "404,560";
  const  equity1 = "130,765";
  const types1 =["text","money"];

  const accounts1 =[
                      ["Personnel expenses","126,567"],
                      ["Purchases","65,987"],
                      ["Cost of sold goods","43,249"],
                      ["Supplies and external services","110,987"],
                      ["Sales and services provided","87,654"],
                      ["Impairment losses","45,324"],
                      ["Variation in production inventories","32,654"],
                      ["Work for own entity","12,345"],
                      ["Depreciation and amortization expenses","7,094"],
                      ["Net profit for the period","92,546"]

                  ];

  return (
    <>
      <div className="tb1">
        <BalanceSheet assets={assets1} liabilities={liabilities1} assetsTotal={assetsTotal1} liabilitiesTotal={liabilitiesTotal1} equity={equity1} types={types1}/>
      </div>
      <div className="tb1">
        <IncomeLossStatement accounts={accounts1} types={types1}/>
      </div>
    </>
  ); 
};
export default Financial;