import React from "react";
import CSS from 'csstype';

import './styles/CustomTable.css';


type CustomTableType = "money" | "percentage" | "text" | "number";

interface TableProps{
    title: String;
    columns: String[]; 
    type: CustomTableType[];
    values: String[][];
}

const CustomTable: React.FC<TableProps> = ({title,columns, type, values}) => {

    const renderType = (i: CustomTableType ) =>{
        switch(type[i]){
            case 'money': return " €";
            case 'percentage': return ' %';
            case 'number': case 'text': default: return ;
        }
    }

    const generateClassName = (i:CustomTableType) =>{
        switch(type[i]){
            case 'text': default: return "text-left";
            case 'money': return "text-right";
            case 'percentage': return "text-right";
            case 'number': return "text-right";
        }
    }

    /* previously were all text-center */
    const generateHeaderClassName = (i:any) =>{
        switch(type[i]){
            case 'text': default: return "header-elem text-left";
            case 'money': return "header-elem text-right";
            case 'percentage': return "header-elem text-right";
            case 'number': return "header-elem text-right";
        }
    }

    var classType = columns.length <= 5 ? "normal-table" : "large-table";
    return(
        <>
            <div className="table-div table-responsive">
                <h3 className="table-title">{title}</h3>
                <table className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                        {columns.map((header_elem, i) => {     
                            return (<th scope="col" className={generateHeaderClassName(i)}>{header_elem}</th>) 
                        })}
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((value) => {     
                            return( 
                            <tr className={classType}>
                            {  
                                value.map((elem, i) => {     
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

export default CustomTable;

/*
TODO
- meter scroll vertical quando houver demasiados items
*/
