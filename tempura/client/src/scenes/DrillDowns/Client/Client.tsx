import React from 'react';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import '../styles/ClientSupplier.css';
import '../../../common.css';


const Client: React.FC = () => {

    const titles=["Entity", "Name", "Country", "Tax ID", "Email", "Phone"];
    const values=["LRLDA", "L. Ribeiro, Lda.", "Portugal", "502607564", "geral@lribeiro.pt", "+351 253 534 890"];

    const titles2=["Entity", "Name", "Country", "Tax ID", "Email", "Phone"];
    const values2=["LRLDA", "L. Ribeiro, Lda.", "Portugal", "502607564", "geral@lribeiro.pt"];


    return (
        <>
            <div className="cenas">
                <DrillInfo title="Client Info" fields={titles} values={values}/>
                <p></p>
                <DrillInfo title="Client Info" fields={titles2} values={values2}/>
              
            </div>
        </>
    );
};

export default Client;