import React from "react";
import CSS from 'csstype';

import './styles/BalanceSheet.css';

interface BalanceSheetProps{
    assets: String[][];
    assetsTotal: String;
    liabilities: String[][];
    liabilitiesTotal: String;
    equity: String;
    types: String[];
    
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({assets,liabilities,assetsTotal,liabilitiesTotal, equity, types}) => {

    const renderType = (i:any) =>{
        switch(types[i]){
            case 'money': return " €";
            case 'number': case 'text': default: return ;
        }
    }

    const generateClassName = (i:any) =>{
        switch(types[i]){
            case 'text': default: return "text-left";
            case 'money': return "text-right";
        }
    }

    return(
        <>
            <div className="balance-sheet-div">
            <h3 className="title">Balance Sheet</h3>
                <table id="assets" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="assets-header">
                            <th scope="col" className="assets-title">Assets</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {assets.map((asset) => { 
                            return( 
                                <tr>
                                {  
                                    asset.map((elem,i) => {     
                                        return (<td className={generateClassName(i)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                        <tr className="space"></tr>
                        <tr className="assets-total">
                            <td className="total">Total Assets:</td>
                            <td className="number-total text-right">{assetsTotal}€</td>
                        </tr>
                    </tbody>
                </table>
                <table id="liabilities" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="liabilities-header">
                            <th scope="col" className="liabilities-title">Liabilities</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {liabilities.map((liability) => { 
                            return( 
                                <tr className="">
                                {  
                                    liability.map((elem,i) => {     
                                        return (<td className={generateClassName(i)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                        <tr className="space"></tr>
                        <tr className="liabilities-total">
                            <td className="total">Total Liabilities:</td>
                            <td className="number-total text-right">{liabilitiesTotal}€</td>
                        </tr>
                        <tr className="space"></tr>
                        <tr className="equity">
                            <td className="total">Total Equity:</td>
                            <td className="number-total text-right">{equity}€</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default BalanceSheet;
