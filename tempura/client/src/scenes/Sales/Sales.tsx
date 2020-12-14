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
import formurlencoded from 'form-urlencoded';

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

  // json request
  const body = {
    start_date: "2020-01-02 00:00:00",
    end_date: "2021-01-01 00:00:00"
  };

  const [topClients, setTopClients] = useState([
    {
      id: '',
      name: '',
      total: 0,
      orders: 0,
      max: 0
    }
  ]);
  const [topProducts, setTopProducts] = useState(
    {
      columns: ["Name", "Sold Units", "Price"],
      types: ["text", "number", "money"],
      values: [] as any[][],
      ids: [] as string[]
    }
  );
  const [cogs, setCogs] = useState([
    {
      date: '',
      cogs: 0,
      sr: 0
    }
  ]);
  const [salesPrice, setSalesPrice] = useState(
    {
      avg_sale: 0
    }
  );
  const [totalRevenue, setTotalRevenue] = useState(
    {
      revenue: 0
    }
  );

  const history = useHistory();
  const maxNumberRows = 6;


  let lables2:Array<any> = [];
  let values2:Array<any> = [];
  let values3:Array<any> = [];
  if(cogs){
    cogs.map((cog:any) => {
      lables2.push(cog.date);
      values2.push(cog.cogs);
      values3.push(cog.sr);
    });
  }
  

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

        } catch (err) {
          history.push('/login');
        }

        // gets top sold products
        axios.get('http://localhost:8000/top_sold_products', { params: { rows: maxNumberRows }, headers: { authorization: token } })
          .then((res) => {
            let products: TopProduct[] = res.data;
            let _topProducts = {
              ...topProducts
            }
            products.forEach((product) => {
              _topProducts.ids.push(product.name);
              _topProducts.values.push([
                product.name,
                product.total_sold,
                product.price
              ]);
            });
            setTopProducts(_topProducts);
          }).catch((err) => {
            console.log(err);
          });


          // gets revenue_growth
          axios.get(`http://localhost:8000/top_clients?start_date=2020-12-02 00:00:00&end_date=2021-01-01 00:00:00`, {
              headers: { 'authorization': token },
            }).then((res:any) => {
              setTopClients(res.data.clients);
            }).catch((err: any) => {
              console.log(err);
            });

          // gets cogs vs sr
          axios.post(`http://localhost:8000/cogs_vs_sales_revenue`, formurlencoded(body), {
              headers: { 
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res) => {
              setCogs(res.data.cogs_vs_sr);
            }).catch((err: any) => {
              console.log(err);
            });

          // gets avergae sales price
          axios.get(`http://localhost:8000/average_sale_price?start_date=2020-12-02 00:00:00&end_date=2021-01-01 00:00:00`, {
              headers: { 'authorization': token },
            }).then((res:any) => {
              setSalesPrice(res.data);
            }).catch((err: any) => {
              console.log(err);
            });

          // gets total revenue
          axios.post(`http://localhost:8000/total_revenue`, formurlencoded(body), {
              headers: { 
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res) => {
              setTotalRevenue(res.data);
            }).catch((err: any) => {
              console.log(err);
            });


      }
      else {
        // redirects to login
        history.push('/login');
      }
    })();
  }, []);

  // Frontend
  const [showDatePicker, setShowDatePicker] = useState(false);

  const columns2 = ["Name", "Total Spent", "Orders", "Maximum"];
  const types2 = ["text", "money", "number", "money"];
  let valuesTable:Array<any> = [];
  let clientIds:Array<any> = [];
  let counter = 0;
  topClients.map(client => {
    if(counter < 5){
      valuesTable.push([client.name, client.total, client.orders, client.max]);
      clientIds.push(client.id);
    }
    counter++;
  })

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

              <div className = "top-things">
                <div className ="left-names">
                  <SingleValueCard type="money" title="Total Revenue" value={Math.round((totalRevenue.revenue) * 100) / 100} />
                  <p></p>
                  <SingleValueCard type="money" title="Average Sales Price" value={Math.round((salesPrice.avg_sale) * 100) / 100} />
                  <p></p>
                </div>
                <div className = "right-line">
                <LineChart title="Cost of Goods Sold vs Sales Revenue" labels={lables2} data={values2} data2={values3} width={400} />
                <p></p>
                </div>
              </div>
              <div className = "bottom-things">
                <CustomTable title="Top Clients" columns={columns2} type={types2} values={valuesTable} drilldown="client" ids={clientIds} />
                <p></p>
                <CustomTable title="Top Selling Products" columns={topProducts.columns} type={topProducts.types} values={topProducts.values} drilldown="product" ids={topProducts.ids} />
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
