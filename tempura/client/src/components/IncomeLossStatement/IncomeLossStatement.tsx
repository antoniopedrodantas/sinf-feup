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

    const generateClassName = (i:any) =>{
        switch(types[i]){
            case 'text': default: return "text-left";
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
                                        return (<td className={generateClassName(i)}>{elem}{renderType(i)}</td> ) 
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
