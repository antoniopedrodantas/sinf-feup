import React from 'react';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import '../styles/ClientSupplier.css';


const Client: React.FC = () => {

    const titles=["Entity", "Name", "Country", "Tax ID", "Email", "Phone"];
    const values=["LRLDA", "L. Ribeiro, Lda.", "Portugal", "502607564", "geral@lribeiro.pt", "+351 253 534 890"];

    const titles2=["Entity", "Name", "Country", "Tax ID", "Email", "Phone"];
    const values2=["LRLDA", "L. Ribeiro, Lda.", "Portugal", "502607564", "geral@lribeiro.pt"];

    const titles3 = ["Name", "Description", "Main Supplier", "Bar Code"];
    const values3 = ["Tempura XL", "Larger Tempuras", "Kaizuya, Co. Ltd", "0 87645869 54689"];

    return (
        <>
            <DrillInfo title="Client Info" fields={titles} values={values}/>
            <p></p>
            <DrillInfo title="Client Info" fields={titles2} values={values2}/>
            <p></p>
            <DrillInfo title="Product Info" fields={titles3} values={values3}/>
        </>
    );
};

export default Client;