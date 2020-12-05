import React from "react";
import './styles/DrillDownInfo.css';

interface InfoProps{
    title: String;
    fields: String[];
    values: String[];
}

const DrillDownInfo: React.FC<InfoProps> = ({title,fields, values}) => {
  
    return (
        <>
        <div className="info-drill">
            <h3 className="table-title">{title}</h3>
            <div className="info-values">
                {fields.map((field, i) => {     
                    return (<p className="info-p"><span className="info-field">{field}</span><span className="info-value">{values[i]}</span></p>) 
                })}
            </div>
        </div>
        </>
  );
};

export default DrillDownInfo;