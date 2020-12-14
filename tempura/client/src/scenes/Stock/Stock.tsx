import React, { useEffect, useState } from 'react';

import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../components/CustomTable/CustomTable';
import SideBar from '../../components/SideBar/SideBar';
import Calendar from '../../components/Calendar/Calendar';
import './styles/Stock.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';


import axios from "axios";
import formurlencoded from 'form-urlencoded';


interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Stock: React.FC = () => {

  const body = {
    start_date: "2020-01-02 00:00:00",
    end_date: "2021-01-01 00:00:00"
  };

  const history = useHistory();

  const [totalAssets, setTotalAssets] = useState(
    {
      total_assets: 0
    }
  );

  const [avgSalesQuantity, setAvgSalesQuantity] = useState(
    {
      average_sales_quantity: 0
    }
  );

  const [inventoryTurnover, setInventoryTurnover] = useState(
    {
      inventory_turnover: 0
    }
  );

  const [inventoryPeriod, setInventoryPeriod] = useState(
    {
      inventory_period: 0
    }
  );

  const [productList, setProductList] = useState(
    {
      columns: ["Bar Code", "Name", "Stock", "Sold", "Avg. Purchase Price", "Avg. Selling Price"],
      types: ["text", "text", "number", "number", "money", "money"],
      values: [] as any[][],
      ids: [] as string[]
    }
  );

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

          // TODO: maybe do something with id later on


        } catch (err) {
          history.push('/login');
        }

      }
      else {
        // redirects to login
        history.push('/login');
      }


       axios.post(`http://localhost:8000/total_assets_in_stock`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        setTotalAssets({ total_assets: res.data.total_assets });
      }).catch((err: any) => {
        console.log(err);
      });

       axios.post(`http://localhost:8000/average_sales_quantity`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        setAvgSalesQuantity({ average_sales_quantity: res.data.average_sales_quantity });
      }).catch((err: any) => {
        console.log(err);
      });

       axios.post(`http://localhost:8000/inventory_turnover`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        setInventoryTurnover({ inventory_turnover: res.data.inventory_turnover });
      }).catch((err: any) => {
        console.log(err);
      });

       axios.post(`http://localhost:8000/inventory_period`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        setInventoryPeriod({ inventory_period: res.data.inventory_period });
      }).catch((err: any) => {
        console.log(err);
      });

       axios.post(`http://localhost:8000/product_listing`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        let products: ProductListEntry[] = res.data.products;
    
        products.forEach((product) => {
          let _products = {
            ...productList
          }
          _products.ids.push(product.name);
          _products.values.push([
            product.barcode,
            product.name,
            product.stock,
            product.sold,
            product.avgPurchasePrice,
            product.avgSellingPrice
          ]);
          setProductList(_products);
        });
      }).catch((err: any) => {
        console.log(err);
      });

    })();

  }, []);

  // Frontend


  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <>
      <div className="frame">

        <input type="checkbox" id="menu" defaultChecked={true}></input>

        <div className="row h-100">
          <div className="left-side col-md-2">
            <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon" /></label>
            <SideBar coreview="stock" />
          </div>

          <div className="right-side col-md-10">
            <div className="toggle-menu">
              <div className="tempura"> Tempura</div>
              <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon" /></label>
            </div>
            <div className="right-body">
              <div className="stock-content">
                <div className="date-selection">
                  <Button onClick={() => setShowDatePicker(!showDatePicker)} className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
                    {showDatePicker ? "Hide" : "Date Picker"}
                  </Button>
                  {showDatePicker && <Calendar start={new Date()} end={new Date(2021, 0, 30)} />}
                </div>
                <div className="top-cards">
                  <SingleValueCard type="money" title="Total assets in Stock" value={totalAssets.total_assets} />
                  <SingleValueCard type="text" title="Inventory Turnover" value={inventoryTurnover.inventory_turnover.toString()} />
                </div>
                <div className="bottom-cards">
                  <SingleValueCard type="unit" title="Average Sales quantity" value={avgSalesQuantity.average_sales_quantity} />
                  <SingleValueCard type="date" title="Inventory Period" value={inventoryPeriod.inventory_period} />
                </div>
                <div className="product-listing">
                  <CustomTable title="Product Listing" columns={productList.columns} type={productList.types} values={productList.values} drilldown="product" ids={productList.ids} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
