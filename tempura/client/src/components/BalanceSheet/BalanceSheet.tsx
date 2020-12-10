import React from "react";
import CSS from 'csstype';

import './styles/BalanceSheet.css';

interface BalanceSheetProps{
    currentAssets: String[][];
    nonCurrentAssets: String[][];
    assetsTotal: String;
    currentLiabilities: String[][];
    nonCurrentLiabilities: String[][];
    liabilitiesTotal: String;
    equity: String[][];
    equityTotal: String;
    types: String[];
    
}


const BalanceSheet: React.FC<BalanceSheetProps> = ({currentAssets,nonCurrentAssets,currentLiabilities,nonCurrentLiabilities,assetsTotal,liabilitiesTotal, equity, equityTotal, types}) => {

    const renderType = (i:any) =>{
        switch(types[i]){
            case 'money': return " €";
            case 'number': case 'text': default: return ;
        }
    }

    const generateClassName = (i:any, value:any) =>{
        let final = "";

        if(value=='Sum') final = "bold-type";

        switch(types[i]){
            case 'text': default: return final.concat("text-left");
            case 'money': return "text-right";
        }
    }


    return(
        <>
            <div className="balance-sheet-div">
            <h3 className="title">Balance Sheet</h3>
                <h4 className="general-title">Assets</h4>
                <table id="current-assets" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                            <th scope="col" className="table-title">Current Assets</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {currentAssets.map((asset) => { 
                            return( 
                                <tr>
                                {  
                                    asset.map((elem,i) => {     
                                        return (<td className={generateClassName(i,elem)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                    </tbody>
                </table>
                <table id="non-current-assets" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                            <th scope="col" className="table-title">Non-Current Assets</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {nonCurrentAssets.map((asset) => { 
                            return( 
                                <tr>
                                {  
                                    asset.map((elem,i) => {     
                                        return (<td className={generateClassName(i,elem)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                        <tr className="space"></tr>
                        <tr className="assets-total">
                            <td className="total">Total Assets:</td>
                            <td className="number-total text-right">{assetsTotal} €</td>
                        </tr>
                        <tr className="space"></tr> 
                    </tbody>
                </table>
                <h4 className="general-title">Liabilities</h4>
                <table id="current-liabilities" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                            <th scope="col" className="table-title">Current Liabilities</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLiabilities.map((liability) => { 
                            return( 
                                <tr className="">
                                {  
                                    liability.map((elem,i) => {     
                                        return (<td className={generateClassName(i, elem)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}                      
                    </tbody>
                </table>
                <table id="non-current-liabilities" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                            <th scope="col" className="table-title">Non-Current Liabilities</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonCurrentLiabilities.map((liability) => { 
                            return( 
                                <tr className="">
                                {  
                                    liability.map((elem,i) => {     
                                        return (<td className={generateClassName(i,elem)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                        <tr className="space"></tr>
                        <tr className="liabilities-total">
                            <td className="total">Total Liabilities:</td>
                            <td className="number-total text-right">{liabilitiesTotal} €</td>
                        </tr>
                        <tr className="space"></tr> 
                    </tbody>
                </table>    
                <h4 className="general-title">Equity</h4>                   
                <table id="equity" className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                            <th scope="col" className="table-title">Equity</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {equity.map((eq) => { 
                            return( 
                                <tr className="">
                                {  
                                    eq.map((elem,i) => {     
                                        return (<td className={generateClassName(i,elem)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                        <tr className="space"></tr>
                        <tr className="equity-total">
                            <td className="total">Total Equity:</td>
                            <td className="number-total text-right">{equityTotal} €</td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default BalanceSheet;
