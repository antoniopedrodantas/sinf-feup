import React from 'react';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import '../styles/Product.css';
import '../../../common.css';


const Product: React.FC = () => {

    const titles = ["Name", "Description", "Main Supplier", "Bar Code"];
    const values = ["Tempura XL", "Larger Tempuras", "Kaizuya, Co. Ltd", "0 87645869 54689"];

    const titles2 = ["Name", "Description", "Main Supplier", "Bar Code"];
    const values2 = ["Tempura XL", "", "Kaizuya, Co. Ltd"];

    return (
        <>
            <div className="cenas">
                <DrillInfo title="Product Info" fields={titles} values={values} supplierID="1"/>
                <p></p>
                <DrillInfo title="Product Info 2" fields={titles2} values={values2} supplierID="3"/>
            </div>
        </>
    );
};

export default Product;