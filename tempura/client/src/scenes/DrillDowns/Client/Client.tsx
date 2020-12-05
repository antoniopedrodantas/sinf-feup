import React from 'react';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import '../styles/ClientSupplier.css';


const Client: React.FC = () => {

    const titles=["ola", "fafe"];
    const values=["ola", "FAFE"];
    return (
        <>
            <DrillInfo title="ola" fields={titles} values={values}/>
        </>
    );
};

export default Client;