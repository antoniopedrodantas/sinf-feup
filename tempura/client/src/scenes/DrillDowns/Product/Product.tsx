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

import axios from 'axios';
import formurlencoded from 'form-urlencoded';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

const Product: React.FC = () => {

    let pageURL = window.location.href;
    let productID = pageURL.substr(pageURL.lastIndexOf('/') + 1);

    // json request body
    const body = {
        start_date: "2020-01-02 00:00:00",
        end_date: "2021-01-01 00:00:00"
    };

    const [productInfo, setProductInfo] = useState(
        {
            name: '',
            description: '',
            main_supplier: {
                id: '',
                name: ''
            },
            bar_code: ''
        }
    );
    const [totalUnitsSold, setTotalUnitsSold] = useState(
        {
            units: 0,
        }
    );
    const [unitsSoldPerDay, setUnitsSoldPerDay] = useState([
        {
            day: '',
            quantity: 0,
        }
    ]);
    const [purchasePrice, setPurchasePrice] = useState(
        {
            average_purchase_price: 0,
        }
    );
    const [salePrice, setSalePrice] = useState(
        {
            average_sale_price: 0,
        }
    );
    const [profit, setProfit] = useState(
        {
            average_profit: 0,
        }
    );
    const [unitsInStock, setUnitsInStock] = useState(
        {
            data: 0,
        }
    );

    const history = useHistory();

    // checks for authentication
    useEffect(() => {
        (async () => {

            // gets auth-token from the local storage
            const token = localStorage.getItem("auth-token");

            // token is not null
            if (token != null) {

                try {

                    // gets data from token
                    // TODO: change secret and add to a .env file possibly
                    const data = jwt.verify(token, 'secret');

                    // gets user id from user
                    const { id } = data as TokenPayload;

                } catch(err) {
                    history.push('/login');
                }

            }
            else {
                // redirects to login
                history.push('/login');
            }

            // gets product's info
            axios.get(`http://localhost:8000/product/${productID}/info?start_date=2020-01-01 00:00:00&end_date=2021-01-01 00:00:00`, {
                headers: { 'authorization': token },
            }).then((res) => {
                setProductInfo(res.data);
            }).catch((err) => {
                console.log(err);
            });

            //gets total units sold
            axios.post(`http://localhost:8000/product/${productID}/total_units_sold`, formurlencoded(body), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setTotalUnitsSold(res.data);
            }).catch((err: any) => {
                console.log(err);
            });

            // gets units sold per day
            axios.get(`http://localhost:8000/product/${productID}/units_sold_per_day?start_date=2020-01-01 00:00:00&end_date=2021-01-01 00:00:00`, {
                headers: { 'authorization': token },
            }).then((res) => {
                setUnitsSoldPerDay(res.data["Units Per Day"]);
            }).catch((err) => {
                console.log(err);
            });

            //gets average purchase price
            axios.post(`http://localhost:8000/product/${productID}/average_purchase_price`, formurlencoded(body), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setPurchasePrice(res.data);
            }).catch((err: any) => {
                console.log(err);
            });

            //gets average sales price
            axios.post(`http://localhost:8000/product/${productID}/average_sale_price`, formurlencoded(body), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setSalePrice(res.data);
            }).catch((err: any) => {
                console.log(err);
            });

            //gets average profit per unit
            axios.post(`http://localhost:8000/product/${productID}/average_profit_per_unit`, formurlencoded(body), {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                setProfit(res.data);
            }).catch((err: any) => {
                console.log(err);
            });

            // gets units in stock
            axios.get(`http://localhost:8000/product/${productID}/units_in_stock?start_date=2020-01-01 00:00:00&end_date=2021-01-01 00:00:00`, {
                headers: { 'authorization': token },
            }).then((res) => {
                setUnitsInStock(res.data);
            }).catch((err) => {
                console.log(err);
            });

        })();

    }, []);

    const titles = ["Name", "Description", "Main Supplier", "Bar Code"];
    const values = [productInfo.name, productInfo.description, productInfo.main_supplier.name, productInfo.bar_code];


    const ids = ["001", "002", "003", "004", "005"];
    const [showDatePicker, setShowDatePicker] = useState(false);

    const labels2: Array<any> = [];
    const values2: Array<any> = [];
    unitsSoldPerDay.map((day: any) => {
        labels2.push(day.day);
        values2.push(day.quantity);
    });


    return (
        <>
            <div className="frame">

                <input type="checkbox" id="menu" defaultChecked={true}></input>

                <div className="row h-100">
                    <div className="left-side col-md-2">
                        <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon" /></label>
                        <SideBar coreview="drill" />
                    </div>

                    <div className="right-side col-md-10">
                        <div className="toggle-menu">
                            <div className="tempura"> Tempura</div>
                            <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon" /></label>
                        </div>
                        <div className="right-body">
                            <div className="product-content">
                                <div className="date-selection">
                                    <Button onClick={() => setShowDatePicker(!showDatePicker)} className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
                                        {showDatePicker ? "Hide" : "Date Picker"}
                                    </Button>
                                    {showDatePicker && <Calendar start={new Date()} end={new Date(2021, 0, 30)} />}
                                </div>


                                <div className="all-info-product">
                                    <div className="main-info-product">
                                        <DrillInfo title="Product Info" fields={titles} values={values} supplierID={productInfo.main_supplier.id} />
                                        <LineChart title="Units Sold" labels={labels2} data={values2} width={600} />
                                    </div>
                                    <div className="single-card-col">
                                        <SingleValueCard type="text" title="Total Units Sold" value={totalUnitsSold.units.toString()} />
                                        <SingleValueCard type="text" title="Units in Stock" value={unitsInStock.data.toString()} />
                                        <SingleValueCard type="money" title="Avg. Puchase Price" value={purchasePrice.average_purchase_price} />
                                        <SingleValueCard type="money" title="Avg. Sale Price" value={salePrice.average_sale_price} />
                                        <SingleValueCard type="money" title="Avg. Profit per Unit" value={profit.average_profit} />
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