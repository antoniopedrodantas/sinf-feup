import React from "react";
import './styles/CustomTable.css';


interface TableProps{
    columns: String[]; 
    type: String[];
    values: String[][];
}

const CustomTable: React.FC<TableProps> = ({columns, type, values}) => {

    const renderType = (i) =>{
        switch(type[i]){
            case 'money': return " €";
            case 'percentage': return ' %';
            case 'text': default: return ;
        }
    }

    return(
        <>
            <table className="table table-dark table-borderless table-sm">
                <thead>
                    <tr className="table-header">
                    {columns.map((header_elem) => {     
                        return (<th scope="col">{header_elem}</th>) 
                    })}
                    </tr>
                </thead>
                <tbody>
                    {values.map((value) => {     
                        return( 
                        <tr>
                        {  
                            value.map((elem, i) => {     
                                return (<td>{elem}{renderType(i)}</td> ) 
                            }) 
                        }
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </>
    );
};

export default CustomTable;