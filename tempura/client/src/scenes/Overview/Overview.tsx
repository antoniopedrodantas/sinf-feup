import React, { useEffect, useState } from 'react';

import SideBar from '../../components/SideBar';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../components/CustomTable/CustomTable';
import './styles/Overview.css';
import '../../common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const Overview: React.FC = () => {

  const history = useHistory();

  // checks for authentication
  useEffect(() => {

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

  }, []);

  // Frontend

  const columns1 = ["Name", "Price", "Description", "Test", "Test", "Test"];
  const types1   = ["text", "text", "text", "money", "money", "money"];
  const values1  = [
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "24", "Windóóóhhhhh", "122", "12", "Fafe"],
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "24", "Windóóóhhhhh", "122", "12", "Fafe"]
                    ];

  const columns2 = ["Name", "Sold Units"];
  const types2   = ["text","number"];
  const values2  = [
                      ["Sushi", "12"],
                      ["Tempura", "100"]
                    ];
  const columns3 = ["Name", "Purchased Units", "Price"];
  const types3   = ["text","number", "money"];
  const values3  = [
                      ["Sushi", "500", "7.8"],
                      ["Tempura", "100", "12"],
                      ["Robata", "270", "5.2"],
                      ["Wasabi", "140", "9"]
                    ];


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
      <div className="tb1">
        <CustomTable title="Product Listing" columns={columns1} type={types1} values={values1} />
      </div>
      
      <div className="tb2">
        <CustomTable title="Top Products Sold" columns={columns2} type={types2} values={values2} /> 
      </div>

      <div className="tb3">
        <CustomTable title="Top Purchased Products" columns={columns3} type={types3} values={values3} />  
      </div>
          </div>
        </div>
      </div>
      </div>
    
      {/* <div className="tb1">
        <CustomTable title="Product Listing" columns={columns1} type={types1} values={values1} />
      </div>
      
      <div className="tb2">
        <CustomTable title="Top Products Sold" columns={columns2} type={types2} values={values2} /> 
      </div>

      <div className="tb3">
        <CustomTable title="Top Purchased Products" columns={columns3} type={types3} values={values3} />  
      </div> */}
    </>
  );
};

export default Overview;
