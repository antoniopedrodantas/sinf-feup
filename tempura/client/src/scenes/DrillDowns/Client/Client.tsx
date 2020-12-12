import React, { useEffect, useState } from 'react';

import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../../components/CustomTable/CustomTable';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import SideBar from '../../../components/SideBar/SideBar';
import Calendar from '../../../components/Calendar/Calendar';
import '../styles/ClientSupplier.css';
import '../../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';

import axios, { AxiosResponse } from 'axios';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Client: React.FC = () => {

    
    let pageURL = window.location.href;
    let clientID = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    console.log( "Client ID: " + clientID);

    const history = useHistory();

    // fields that will make up the web page
    const [infoResults, setInfoResults] = useState(
        {
            name: '',
            country: '',
            taxID: '',
            email: '',
            phone: '',
        }
    );
    const [totalSales, setTotalSales] = useState(
        {
            total_sales: 0,
        }
    );
    const [topProducts, setTopProducts] = useState([
        {
            id: '',
            name: '',
            units: '',
        }
    ])

    // checks for authentication
    useEffect(() => {
        (async () => {

            // gets auth-token from the local storage
            const token = localStorage.getItem("auth-token");

            // token is not null
            if(token != null){

            try{

                // gets data from token
                // TODO: change secret and add to a .env file possibly
                const data = jwt.verify(token, 'secret');

                // gets user id from user
                const { id } = data as TokenPayload;

                // TODO: maybe do something with id later on
                console.log("User ID: ", id);

            } catch(err) {
                history.push('/login');
            }

            }
            else{
            // redirects to login
            history.push('/login');
            }

            // gets client's info
            await axios.get(`http://localhost:8000/client/${clientID}/info?start_date=2020-12-02 00:00:00&end_date=2021-01-01 00:00:00`, {
                        headers: { 'authorization': token },
                    }).then((res) => {
                        setInfoResults(res.data);
                    }).catch((err) => {
                        console.log(err);
                });

            // gets total sales for that client
            await axios.get(`http://localhost:8000/client/${clientID}/total_sales?start_date=2020-12-02 00:00:00&end_date=2021-01-01 00:00:00`, {
                        headers: { 'authorization': token },
                    }).then((res) => {
                        setTotalSales(res.data);
                    }).catch((err) => {
                        console.log(err);
                });

            // gets client's top products purchased
            await axios.get(`http://localhost:8000/client/${clientID}/top_products_purchased?start_date=2020-12-02 00:00:00&end_date=2021-01-01 00:00:00`, {
                        headers: { 'authorization': token },
                    }).then((res) => {
                        setTopProducts(res.data.products);
                        console.log(res.data.products);
                    }).catch((err) => {
                        console.log(err);
                });



        })();

    }, []);


    let titles=["ID", "Name", "Country", "Tax ID", "Email", "Phone"];
    let values=[clientID, infoResults.name, infoResults.country, infoResults.taxID, infoResults.email, infoResults.phone];

    const columns1 = ["Name", "Purchased Units"];
    const types1 = ["text", "number"];

    let values1:Array<any> = [];

    topProducts.map((product) => {
        values1.push([product.name, parseInt(product.units)]);
    });

    // const values1 = valuesTmp;

    const ids = ["001", "002", "003", "004", "005"];
    const [showDatePicker, setShowDatePicker] = useState(false);

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
                            <div className="client-content">
                                <div className="date-selection">
                                    <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                                        {showDatePicker ? "Hide" : "Date Picker"}
                                    </Button>
                                    {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
                                </div>
                                
                                
                                <div className="all-info">
                                    <div className="top-elements">
                                        <DrillInfo title="Client Info" fields={titles} values={values}/>
                                        <CustomTable title="Top Products Purchased" columns={columns1} type={types1} values={values1} drilldown="product" ids={ids}/>
                                    </div>
                                    <div className="bot-elements"> 
                                        <SingleValueCard type="money" title="Total Sales" value={totalSales.total_sales}/>
                                        <SingleValueCard type="money" title="Accounts Receivable" value={2294}/>
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

export default Client;