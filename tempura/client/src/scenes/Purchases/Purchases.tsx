import React, { useEffect, useState } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import Calendar from 'src/components/Calendar/Calendar';
import './styles/Purchases.css';
import PieChart from 'src/components/Charts/PieChart';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import CustomTable from 'src/components/CustomTable/CustomTable';
import axios from "axios";

import formurlencoded from 'form-urlencoded';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Purchases: React.FC = () => {

  const body = {
    start_date: "2020-01-02 00:00:00",
    end_date: "2021-01-01 00:00:00"
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  // TODO: fix this?
  const maxNumberRows = 6;

  const history = useHistory();

  const [topSuppliers, setTopSuppliers] = useState(
    {
      columns: ["Name", "Total Spent", "Orders", "Maximum"],
      types: ["text", "money", "number", "money"],
      values: [] as any[][],
      ids: [] as string[],
    }
  );

  const [topProducts, setTopProducts] = useState(
    {
      columns: ["Name", "Purchased Units", "Price"],
      types: ["text", "number", "money"],
      values: [] as any[][],
      ids: [] as string[]
    }
  );

  const [supplierCountries, setSupplierCountries] = useState(
    {
      columns: [] as string[],
      values: [] as string[],
      ids: [] as string[]
    }
  );

  const [avgMarginPerSupplier, setAvgMarginPerSupplier] = useState(
    {
      margin: 0
    }
  );

  const [largestMarginSupplier, setLargestMarginSupplier] = useState(
    {
      id: "",
      name: "",
      margin: 0
    }
  )

  //  checks for authentication
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

      }
      else {
        // redirects to login
        history.push('/login');
      }

      axios.get(`http://localhost:8000/top_suppliers`, {
        headers: { authorization: token },
        params: { rows: maxNumberRows }
      }).then((res) => {
        let suppliers: TopSupplier[] = res.data;
        suppliers.forEach((supplier) => {
          let _topSuppliers = {
            ...topSuppliers
          }
          _topSuppliers.ids.push(supplier.id);
          _topSuppliers.values.push([
            supplier.name,
            supplier.total_spent,
            supplier.numOrders,
            supplier.max_spent
          ]);
          setTopSuppliers(_topSuppliers);
        });
      }).catch((err) => {
        console.log(err);
      });

      axios.get(`http://localhost:8000/top_purchased_products`, {
        headers: { authorization: token },
        params: { rows: maxNumberRows }
      }).then((res) => {
        let topPurchasedProducts: TopProduct[] = res.data;
        topPurchasedProducts.forEach((product) => {
          let _topProducts = {
            ...topProducts
          }
          _topProducts.ids.push(product.name);
          _topProducts.values.push([
            product.name,
            product.total_sold,
            product.price
          ]);
          setTopProducts(_topProducts);
        });
      }).catch((err) => {
        console.log(err);
      });

      axios.get(`http://localhost:8000/supplier_country`, {
        headers: { authorization: token },
      }).then((res) => {
        let _supplierCountries: SupplierCountry[] = res.data;
        _supplierCountries.forEach((supplier) => {
          let _supplierCountry = {
            ...supplierCountries
          }
          _supplierCountry.ids.push(supplier.id);
          _supplierCountry.values.push(supplier.value.toString());
          _supplierCountry.columns.push(supplier.name);
          setSupplierCountries(_supplierCountry);
        });
      }).catch((err) => {
        console.log(err);
      });

      axios.post(`http://localhost:8000/average_margin_per_supplier`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        setAvgMarginPerSupplier({ margin: res.data.average_margin });
      }).catch((err: any) => {
        console.log(err);
      });

      axios.post(`http://localhost:8000/largest_margin_supplier`, formurlencoded(body), {
        headers: {
          'authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        setLargestMarginSupplier(res.data.supplier);
      }).catch((err: any) => {
        console.log(err);
      });

    })();

  }, []);




  // Frontend


  return (
    <>
      <div className="frame">
        <div className="frame">
          <div className="frame">

            <input type="checkbox" id="menu" defaultChecked={true}></input>

            <div className="row h-100">
              <div className="left-side col-md-2">
                <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon" /></label>
                <SideBar coreview="purchases" />
              </div>

              <div className="right-side col-md-10">
                <div className="toggle-menu">
                  <div className="tempura"> Tempura</div>
                  <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon" /></label>
                </div>
                <div className="right-body">

                  <div className="purchases-content">

                    <div className="date-selection">
                      <Button onClick={() => setShowDatePicker(!showDatePicker)} className="date-btn" variant="outlined"> <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
                        {showDatePicker ? "Hide" : "Date Picker"}
                      </Button>
                      {showDatePicker && <Calendar start={new Date()} end={new Date(2021, 0, 30)} />}
                    </div>
                    <div className="top-things">
                      <div className="left-cards">
                        <SingleValueCard type="money" title="Average per Margin Supplier" value={avgMarginPerSupplier.margin} />
                        <p></p>
                        <SingleValueCard type="text" title="Largest Margin Supplier" value={largestMarginSupplier.name} supplierID={largestMarginSupplier.id} />
                        <p></p>
                      </div>
                      <div className="right-chart">
                        <PieChart title="Supplier Countries" labels={supplierCountries.columns} data={supplierCountries.values} />
                        <p></p>
                      </div>
                    </div>
                    <div className="bottom-things">
                      <CustomTable title="Top Suppliers" columns={topSuppliers.columns} type={topSuppliers.types} values={topSuppliers.values} drilldown="supplier" ids={topSuppliers.ids} />
                      <p></p>
                      <CustomTable title="Top Purchased Products" columns={topProducts.columns} type={topProducts.types} values={topProducts.values} drilldown="product" ids={topProducts.ids} />
                    </div>
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

export default Purchases;
