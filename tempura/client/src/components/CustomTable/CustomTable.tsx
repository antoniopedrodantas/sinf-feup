import React from "react";
import CSS from 'csstype';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import './styles/CustomTable.css';

interface TableProps{
    title: String;
    columns: String[]; 
    type: String[];
    values: String[][];
    drilldown: String;
    ids: String[];
}

const CustomTable: React.FC<TableProps> = ({title,columns, type, values, drilldown, ids}) => {

    const renderType = (i:any) =>{
        switch(type[i]){
            case 'money': return " €";
            case 'percentage': return ' %';
            case 'number': case 'text': default: return ;
        }
    }

    const generateClassName = (i:any) =>{
        switch(type[i]){
            case 'text': default: return "text-left";
            case 'money': return "text-right";
            case 'percentage': return "text-right";
            case 'number': return "text-right";
        }
    }

    const generateHeaderClassName = (i:any) =>{
        switch(type[i]){
            case 'text': default: return "header-elem text-left";
            case 'money': return "header-elem text-right";
            case 'percentage': return "header-elem text-right";
            case 'number': return "header-elem text-right";
        }
    }

    const generateElement = (elem: any, i: any, j: any) =>{
        if(columns[i] == "Name"){
            switch(drilldown){
                case 'product': return <Link  className="link" to={"/product/" + ids[j]}>{elem}</Link>;
                case 'client': return <Link  className="link" to={"/client/" + ids[j]}>{elem}</Link>;
                case 'supplier': return <Link  className="link" to={"/supplier/" + ids[j]}>{elem}</Link>;
            }
        }
        else{
            return elem;
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
                            return (<th scope="col" key={i} className={generateHeaderClassName(i)}>{header_elem}</th>) 
                        })}
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((value, j) => {     
                            return( 
                            <tr key={j} className={classType}>
                            {  
                                value.map((elem, i) => {     
                                    return (<td key={i} className={generateClassName(i)}>{generateElement(elem,i, j)}{renderType(i)}</td> ) 
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

