import React from "react";
import './styles/DrillDownInfo.css';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
interface InfoProps{
    title: String;
    fields: String[];
    values: String[];
    supplierID?: String;
}

const DrillDownInfo: React.FC<InfoProps> = ({title,fields, values, supplierID}) => {
  
    const retrieveValue = (i: any) =>{
        if(values[i] != null && values[i] != "" && fields[i] == "Main Supplier"){
            return <Link  className="link" to={"/supplier/" + supplierID}>{values[i]}</Link>
        }
        else if(values[i] != null && values[i] != "")
            return values[i]
        else
            return <i>no information</i>
    }

    
    return (
        <>
        <div className="info-drill">
            <h3 className="drill-title">{title}</h3>
            <div className="info-values">
                {fields.map((field, i) => {     
                    return (<p key={i} className="info-p"><span className="info-field">{field}:</span><span className="info-value">{retrieveValue(i)}</span></p>) 
                })}
            </div>
        </div>
        </>
  );
};

export default DrillDownInfo;