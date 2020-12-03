import React from "react";
import './styles/CustomTable.css';


interface TableProps{
    title: String;
    columns: String[]; 
    type: String[];
    values: String[][];
}

const CustomTable: React.FC<TableProps> = ({title,columns, type, values}) => {

    const renderType = (i) =>{
        switch(type[i]){
            case 'money': return " €";
            case 'percentage': return ' %';
            case 'number': return ;
            case 'text': default: return ;
        }
    } /*add number to fiels */

    const generateClassName = (i) =>{
        switch(type[i]){
            case 'text': default: return "text-left";
            case 'money': return "text-right";
            case 'percentage': return "text-right";
            case 'number': return "text-right";
        }
    }
    var classType = columns.length <= 5 ? "normal-table" : "large-table";

    return(
        <>
            <div className="table-div">
                <h3 className="table-title">{title}</h3>
                <table className="table table-dark table-borderless table-sm">
                    <thead>
                        <tr className="table-header">
                        {columns.map((header_elem) => {     
                            return (<th scope="col" className="header-elem text-center">{header_elem}</th>) 
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
