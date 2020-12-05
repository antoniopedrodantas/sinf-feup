import React from "react";
import './styles/DrillDownInfo.css';

interface InfoProps{
    title: String;
    fields: String[];
    values: String[];
}

const DrillDownInfo: React.FC<InfoProps> = ({title,fields, values}) => {
  
    const retrieveValue = (i: any) =>{
        if(values[i]!= null)
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
                    return (<p className="info-p"><span className="info-field">{field}:</span><span className="info-value">{retrieveValue(i)}</span></p>) 
                })}
            </div>
        </div>
        </>
  );
};

export default DrillDownInfo;