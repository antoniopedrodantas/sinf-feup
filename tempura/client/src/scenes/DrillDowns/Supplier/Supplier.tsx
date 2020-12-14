import React, { useEffect, useState } from 'react';

import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../../components/CustomTable/CustomTable';
import DrillInfo from '../../../components/DrillDownInfo/DrillDownInfo';
import SideBar from '../../../components/SideBar/SideBar';
import Calendar from '../../../components/Calendar/Calendar';
import '../../../common.css';
import '../styles/ClientSupplier.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';

import axios from 'axios';
import formurlencoded from 'form-urlencoded';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Supplier: React.FC = () => {

    let pageURL = window.location.href;
    let supplierID = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    console.log( "Supplier ID: " + supplierID);

    // json request body
    const body = {
        start_date: "2020-01-02 00:00:00",
        end_date: "2021-01-01 00:00:00"
    };

    const [supplierInfo, setSupplierInfo] = useState(
        {
            id: '',
            name: '',
            country: '',
            tax_id: '',
            email: '',
            phone: ''
        }
    );
    const [topProductsPurchased, setTopProductsPurchased] = useState([
        {
            id: '',
            name: '',
            units: 0
        },
    ]);
    const [accountsPayable, setAccountsPayable] = useState(
        {
            accounts_payable: 0,
        }
    );
    const [totalPurchases, setTotalPurchases] = useState(
        {
            total_sales: 0,
        }
    );

    const history = useHistory();

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

            // gets supplier's info
            await axios.get(`http://localhost:8000/supplier/${supplierID}/info`, {
                headers: { 'authorization': token },
            }).then((res) => {
                setSupplierInfo(res.data);
            }).catch((err) => {
                console.log(err);
            });

            // gets top products purchased
            await axios.post(`http://localhost:8000/supplier/${supplierID}/top_products_purchased`, formurlencoded(body), {
                headers: { 
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setTopProductsPurchased(res.data.products);
            }).catch((err: any) => {
                console.log(err);
            });

            // gets accounts payable
            await axios.post(`http://localhost:8000/supplier/${supplierID}/accounts_payable`, formurlencoded(body), {
                headers: { 
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setAccountsPayable(res.data);
            }).catch((err: any) => {
                console.log(err);
            });

            // gets total purchases
            await axios.post(`http://localhost:8000/supplier/${supplierID}/total_purchases`, formurlencoded(body), {
                headers: { 
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setTotalPurchases(res.data);
            }).catch((err: any) => {
                console.log(err);
            });

        })();


    }, []);

    const titles=["ID", "Name", "Country", "Tax ID", "Email", "Phone"];
    // const values=["LRLDA", "L. Ribeiro, Lda.", "Portugal", "502607564", "geral@lribeiro.pt", "+351 253 534 890"];
    const values=[supplierInfo.id, supplierInfo.name, supplierInfo.country, supplierInfo.tax_id, supplierInfo.email, supplierInfo.phone];

    const columns1 = ["Name", "Sold Units"];
    const types1 = ["text", "number"];
    // const values1 = [
    //     ["Sushi", "550"],
    //     ["Hossomakis", "550"],
    //     ["Sashimi", "5150"],
    //     ["Yakisoba", "550"],
    //     ["Yakisoba", "550"]
    // ];
    let values1:Array<any> = [];
    let ids:Array<any> = [];
    let counter = 0;
    topProductsPurchased.map((product:any) => {
        if(counter < 5){
            values1.push([product.name, product.units]);
            ids.push(product.id);
        }
        counter++;
    });


    //const ids = ["001", "002", "003", "004", "005"];


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
                            <div className="supplier-content">
                                <div className="date-selection">
                                    <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                                        {showDatePicker ? "Hide" : "Date Picker"}
                                    </Button>
                                    {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
                                </div>
                                
                                
                                <div className="all-info">
                                    <div className="top-elements">
                                        <DrillInfo title="Supplier Info" fields={titles} values={values}/>
                                        <CustomTable title="Top Products Sold" columns={columns1} type={types1} values={values1} drilldown="product" ids={ids}/>
                                    </div>
                                    <div className="bot-elements"> 
                                        <SingleValueCard type="money" title="Total Purchases" value={totalPurchases.total_sales}/>
                                        <SingleValueCard type="money" title="Accounts Payable" value={accountsPayable.accounts_payable}/>
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

export default Supplier;