import React, { useEffect, useState } from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import LineChart from '../../components/Charts/LineChart';
import Calendar from 'src/components/Calendar/Calendar';

import './styles/Sales.css';
import SideBar from '../../components/SideBar/SideBar';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import CustomTable from 'src/components/CustomTable/CustomTable';
import { Button } from 'react-bootstrap';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Sales: React.FC = () => {

  const lables2 = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
  const values2 = ["500", "200", "120", "310", "400", "297"];
  const values3 = ["300", "180", "80", "180", "220", "110"];

  const history = useHistory();
  const maxNumberRows = 6;

  const [topProducts, setTopProducts] = useState(
    {
      columns: ["Name", "Sold Units", "Price"],
      types: ["text", "number", "money"],
      values: [] as any[][],
      ids: [] as string[]
    }
  );


  // // checks for authentication
  // useEffect(() => {
  //   (async () => {

  //     // gets auth-token from the local storage
  //     const token = localStorage.getItem("auth-token");

  //     // token is not null
  //     if (token != null) {

  //       try {

  //         // gets data from token
  //         // TODO: change secret and add to a .env file possibly
  //         const data = jwt.verify(token, 'secret');

  //         // gets user id from user
  //         const { id } = data as TokenPayload;

  //         // TODO: maybe do something with id later on
  //         console.log("User ID: ", id);

          

  //       } catch (err) {
  //         history.push('/login');
  //       }

  //       await axios.get('http://localhost:8000/top_sold_products', { params: { rows: maxNumberRows }, headers: { authorization: token } })
  //         .then((res) => {
  //           let products: TopProduct[] = res.data;
  //           let _topProducts = {
  //             ...topProducts
  //           }
  //           products.forEach((product) => {
  //             _topProducts.ids.push(product.name);
  //             _topProducts.values.push([
  //               product.name,
  //               product.total_sold,
  //               product.price
  //             ]);
  //           });
  //           setTopProducts(_topProducts);
  //         }).catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //     else {
  //       // redirects to login
  //       history.push('/login');
  //     }
  //   })();
  // }, []);

  // Frontend
  const [showDatePicker, setShowDatePicker] = useState(false);

  const columns1 = ["Name", "Sold Units", "Price"];
  const types1 = ["text", "number", "money"];
  const values1 = [
      ["Sashimi", "150", "17.8"],
      ["Tempura", "121", "18.8"],
      ["Sushi", "103", "20.0"],
      ["Robata", "89", "9.2"],
      ["Robata", "89", "9.2"]
  ];

  const columns2 = ["Name", "Total Spent", "Orders", "Maximum"];
  const types2 = ["text", "money", "number", "money"];
  const valuesTable = [
    ["Cliente top", "10,500", "17", "2,500"],
    ["Cliente top", "10,500", "17", "2,500"],
    ["Cliente top", "10,500", "17", "2,500"],
    ["Cliente top", "10,500", "17", "2,500"],
    ["Cliente top", "10,500", "17", "2,500"]
];

  return (
    <>
      <div className="frame">

        <input type="checkbox" id="menu" defaultChecked={true}></input>

        <div className="row h-100">
          <div className="left-side col-md-2">
            <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon" /></label>
            <SideBar coreview="sales" />
          </div>
          <div className="right-side col-md-10">
            <div className="toggle-menu">
              <div className="tempura"> Tempura</div>
              <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon" /></label>
            </div>
            <div className="right-body">

            <div className="sales-content">

              <div className="date-selection">
                  <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                      {showDatePicker ? "Hide" : "Date Picker"}
                  </Button>
                  {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
              </div>
              {/* <div className = "top-things">
                <SingleValueCard type="money" title="Total Revenue" value={500309} />
                <p></p>
                <SingleValueCard type="money" title="Average Sales Price" value={789} />
                <p></p>
                <LineChart title="Cost of Goods Sold vs Sales Revenue" labels={lables2} data={values2} data2={values3} width={600} />
                <p></p>
              </div>
              <div className = "bottom-things">
                <CustomTable title="Top Clients" columns={topProducts.columns} type={topProducts.types} values={topProducts.values} drilldown="product" ids={topProducts.ids} />
                <p></p>
                <CustomTable title="Top Selling Products" columns={topProducts.columns} type={topProducts.types} values={topProducts.values} drilldown="product" ids={topProducts.ids} />
              </div> */}
              <div className = "top-things">
                <div className ="left-names">
                  <SingleValueCard type="money" title="Total Revenue" value={500309} />
                  <p></p>
                  <SingleValueCard type="money" title="Average Sales Price" value={789} />
                  <p></p>
                </div>
                <div className = "right-line">
                <LineChart title="Cost of Goods Sold vs Sales Revenue" labels={lables2} data={values2} data2={values3} width={400} />
                <p></p>
                </div>
              </div>
              <div className = "bottom-things">
                <CustomTable title="Top Clients" columns={columns2} type={types2} values={valuesTable} drilldown="product" ids={topProducts.ids} />
                <p></p>
                <CustomTable title="Top Selling Products" columns={columns1} type={types1} values={values1} drilldown="product" ids={topProducts.ids} />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
