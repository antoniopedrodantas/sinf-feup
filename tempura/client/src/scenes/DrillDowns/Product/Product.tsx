import React, { useEffect, useState } from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import SideBar from '../../../components/SideBar/SideBar';
import Calendar from '../../../components/Calendar/Calendar';
import LineChart from '../../../components/Charts/LineChart';
import '../styles/Product.css';
import '../../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button, Col, Row } from 'react-bootstrap';


const Product: React.FC = () => {

    let pageURL = window.location.href;
    let productID = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    console.log( "Product ID: " + productID);

    const history = useHistory();

    const titles = ["Name", "Description", "Main Supplier", "Bar Code"];
    const values = ["Tempura XL", "Larger Tempuras", "Kaizuya, Co. Ltd", "0 87645869 54689"];


    const ids = ["001", "002", "003", "004", "005"];
    const [showDatePicker, setShowDatePicker] = useState(false);

    const labels2 = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
  const values2 = ["50", "40", "45", "30", "52", "30"];


    return (
        <>
            <div className="frame"> 

                <input type="checkbox" id="menu" defaultChecked={true}></input>

                <div className="row h-100">
                    <div className="left-side col-md-2">
                        <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon"/></label>
                        <SideBar coreview="drill"/>
                    </div>

                    <div className="right-side col-md-10">
                        <div className="toggle-menu">
                            <div className="tempura"> Tempura</div>
                            <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
                        </div>
                        <div className="right-body">
                            <div className="product-content">
                                <div className="date-selection">
                                    <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                                        {showDatePicker ? "Hide" : "Date Picker"}
                                    </Button>
                                    {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
                                </div>
                                
                                
                                <div className="all-info">
                                    <div className="main-info-product">
                                    <DrillInfo title="Product Info" fields={titles} values={values} supplierID="1"/>
                                    <LineChart title="Units Sold per Month" labels={labels2} data={values2} width={600}/>
                                    </div>
                                    <div className="single-card-col">
                                        <SingleValueCard type="text" title="Total Units Sold" value={"9435"}/>
                                        <SingleValueCard type="text" title="Units in Stock" value={"2294"}/>
                                        <SingleValueCard type="money" title="Avg. Puchase Price" value={9435}/>
                                        <SingleValueCard type="money" title="Avg. Sale Price" value={2294}/>
                                        <SingleValueCard type="money" title="Avg. Profit per Unit" value={9435}/>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;