import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';

import SideBar from '../../components/SideBar/SideBar';
import Calendar from '../../components/Calendar/Calendar';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../components/CustomTable/CustomTable';
import LineChart from '../../components/Charts/LineChart';

import './styles/Overview.css';
import '../../common.css';

import axios, { AxiosResponse } from 'axios';
import formurlencoded from 'form-urlencoded';
import qs from 'qs';


interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Overview: React.FC = () => {

  // json request body
  const body = {
    start_date: "2020-01-02 00:00:00",
    end_date: "2021-01-01 00:00:00"
  };
  const body2 = {
    start_date: "2018-12-31 00:00:00",
    end_date: "2020-01-01 00:00:00"
  };

  // overview component
  const [revenueGrowth, setRevenueGrowth] = useState([
    {
        day: '',
        revenue_growth: 0,
    }
  ]);
  const [totalProfit, setTotalProfit] = useState(
    {
      total_profit: 0,
    }
  );
  const [totalRevenue, setTotalRevenue] = useState(
    {
      revenue: 0,
    }
  );
  const [liquidity, setLiquidity] = useState(
    {
      liquidity: 0,
    }
  );
  const [totalCosts, setTotalCosts] = useState(
    {
      total_costs: 0,
    }
  );
  const [topSellingProducts, setTopSellingProducts] = useState([
    {
      name: '',
      quantity: 0
    }
  ]);

  const history = useHistory();

  //checks for authentication
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
          const { id } = data as TokenPayload;

          // TODO: maybe do something with id later on
        } catch(err) {
          history.push('/login');
        }



      }
      else{
        history.push('/login');
      }

      // gets revenue_growth
      await axios.get(`http://localhost:8000/revenue_growth?start_date=2020-01-02 00:00:00&end_date=2021-01-01 00:00:00`, {
              headers: { 'authorization': token },
            }).then((res: { data: { revenue_growth: React.SetStateAction<{ day: string; revenue_growth: number; }[]>; }; }) => {
              setRevenueGrowth(res.data.revenue_growth);
            }).catch((err: any) => {
              console.log(err);
            });

      // gets total profit
      await axios.post(`http://localhost:8000/total_profit`, formurlencoded(body), {
              headers: { 
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res) => {
              setTotalProfit(res.data);
            }).catch((err: any) => {
              console.log(err);
            });
      

      // gets total revenue
      await axios.post(`http://localhost:8000/total_revenue`, formurlencoded(body), {
              headers: { 
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res) => {
              setTotalRevenue(res.data);
            }).catch((err: any) => {
              console.log(err);
            });

          
      // gets liquidity
      await axios.post(`http://localhost:8000/liquidity`, formurlencoded(body2), {
              headers: { 
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res) => {
              setLiquidity(res.data);
            }).catch((err: any) => {
              console.log(err);
            });

      // gets total costs
      await axios.post(`http://localhost:8000/total_costs`, formurlencoded(body), {
              headers: { 
                'authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res) => {
              setTotalCosts(res.data);
            }).catch((err: any) => {
              console.log(err);
            });

      // gets top selling products
      await axios.get(`http://localhost:8000/top_selling_products?start_date=2020-01-02 00:00:00&end_date=2021-01-01 00:00:00`, {
              headers: { 'authorization': token },
            }).then((res) => {
              setTopSellingProducts(res.data.products);
            }).catch((err: any) => {
              console.log(err);
            });

    

    })();

  }, []);

  // Frontend
  const [showDatePicker, setShowDatePicker] = useState(false);

  // const columns1 = ["Name", "Sold Units", "Price"];
  // const types1 = ["text", "number", "money"];
  // const values1 = [
  //     ["Sashimi", "150", "17.8"],
  //     ["Tempura", "121", "18.8"],
  //     ["Sushi", "103", "20.0"],
  //     ["Robata", "89", "9.2"],
  //     ["Robata", "89", "9.2"]
  // ];
  const columns1 = ["Name", "Sold Units"]
  const types1 = ["text", "number"];
  let values1:Array<any> = [];
  let ids:Array<any> = [];
  let counter = 0;
  topSellingProducts.map((product) => {
    if(counter < 5){
      values1.push([product.name, product.quantity]);
      ids.push(product.name);
    }
    counter++;
  });

  // const ids = ["001", "002", "003", "004", "005"];

  let labels2:Array<any> = [];
  let values2:Array<any> = [];
  revenueGrowth.map((revenue) => {
    labels2.push(revenue.day);
    values2.push(revenue.revenue_growth);
  });

  return (
    <>
      <div className="frame"> 

        <input type="checkbox" id="menu" defaultChecked={true}></input>

        <div className="row h-100">
          <div className="left-side col-md-2">
            <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon"/></label>
            <SideBar coreview="overview"/>
          </div>

          <div className="right-side col-md-10">
            <div className="toggle-menu">
              <div className="tempura"> Tempura</div>
              <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
            </div>
            <div className="right-body">

              <div className="overview-content">

                <div className="date-selection">
                  <Button onClick={()=> setShowDatePicker(!showDatePicker)}className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/> 
                    {showDatePicker ? "Hide" : "Date Picker"}
                  </Button>
                  {showDatePicker && <Calendar start={new Date()} end={new Date(2021,0,30)}/>} 
                </div>

              
                <div className="frame-top">
                  <div className="left-frame-top">
                    <SingleValueCard type="money" title="Total Profit" value={totalProfit.total_profit}/>
                    <SingleValueCard type="percentage" title="Liquidity" value={liquidity.liquidity}/>
                  </div>
                  <div className="mid-frame-top">
                    <SingleValueCard type="money" title="Total Revenue" value={totalRevenue.revenue}/>
                    <SingleValueCard type="money" title="Total Costs" value={totalCosts.total_costs}/>
                  </div>
                  <div className="top-selling">
                    <CustomTable title="Top Selling Products" columns={columns1} type={types1} values={values1} drilldown="product" ids={ids}/>
                  </div>
                </div>

                <LineChart title="Revenue Growth" labels={labels2} data={values2} width={600}/>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
