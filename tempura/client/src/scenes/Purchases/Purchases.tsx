import React, { useEffect, useState } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import CustomTable from 'src/components/CustomTable/CustomTable';
import axios from "axios";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Purchases: React.FC = () => {

  const lables = ["Vitor", "Bernas", "Tone", "Filipe", "Leonor"];
  const values = ["13", "5", "3", "5", "7"];

  const lables2 = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
  const values2 = ["500", "200", "120", "310", "400", "297"];
  const values3 = ["300", "180", "80", "180", "220", "110"];

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
      types:   ["text", "number", "money"],
      // values: [] as any[][],
      // ids: [] as string[],
      values: [["Soba", "10000", "50"]],
      ids: ["1"]
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
          console.log("User ID: ", id);

        } catch (err) {
          history.push('/login');
        }

      }
      else {
        // redirects to login
        history.push('/login');
      }

      await axios.get('http://localhost:8000/top_suppliers', {
        headers: { 'authorization': token },
      }).then((res) => {
        let suppliers: TopSupplier[] = res.data;
        suppliers.forEach((supplier) => {
          let tmpTopSuppliers = {
            ... topSuppliers
          }
          tmpTopSuppliers.ids.push(supplier.id);
          tmpTopSuppliers.values.push([
            supplier.name,
            supplier.total_spent,
            supplier.numOrders,
            supplier.max_spent
          ]);
          setTopSuppliers(tmpTopSuppliers);
        });
    
      }).catch((err) => {
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
                  <PieChart title="Supplier Region" labels={lables} data={values} />
                  <p></p>
                  <LineChart title="Revenue Growth" labels={lables2} data={values2} width={600} />
                  <p></p>
                  <LineChart title="Cost of Goods Sold vs Sales Revenue" labels={lables2} data={values2} data2={values3} width={600} />
                  <p></p>
                  <CustomTable title="Top Suppliers" columns={topSuppliers.columns} type={topSuppliers.types} values={topSuppliers.values} drilldown="product" ids={topSuppliers.ids} />
                  <p></p>
                  <CustomTable title="Top Suppliers" columns={topProducts.columns} type={topProducts.types} values={topProducts.values} drilldown="product" ids={topProducts.ids} />
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
