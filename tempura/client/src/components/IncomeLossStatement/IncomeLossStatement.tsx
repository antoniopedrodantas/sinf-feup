import React from "react";
import CSS from 'csstype';

import './styles/IncomeLossStatement.css';

interface IncomeLossStatementProps{
    accounts: String[][];
    types: String[];
    
}

const IncomeLossStatement: React.FC<IncomeLossStatementProps> = ({accounts, types}) => {

    const renderType = (i:any) =>{
        switch(types[i]){
            case 'money': return " €";
            case 'number': case 'text': default: return ;
        }
    }

    const generateClassName = (i:any,value:any) =>{
        let final = "";

        if(value=="Result of Discontinued Activities (Net of Taxes) Included in Net Income for the Period" || value=="Net Income for the Period" || value=="Income Before Taxes" || value=="Operating Income (Before Financing Expenses and taxes)" || value=="Income Before Depreciation, Financing Expenses and Taxes")
         final = "bold-type";

        switch(types[i]){
            case 'text': default: return final.concat("text-left");
            case 'money': return "text-right";
        }
    }

    return(
        <>
            <div className="income-loss-div">
            <h3 className="title">Income Loss Statement</h3>
                <table id="statement" className="table table-dark table-borderless table-sm">
                    <tbody>
                        {accounts.map((account) => { 
                            return( 
                                <tr>
                                {  
                                    account.map((elem, i) => {     
                                        return (<td className={generateClassName(i,elem)}>{elem}{renderType(i)}</td> ) 
                                    }) 
                                }
                                </tr>
                                )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default IncomeLossStatement;
