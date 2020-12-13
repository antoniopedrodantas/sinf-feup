import React, { useEffect } from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';

import './styles/Sales.css';
import SideBar from '../../components/SideBar/SideBar';
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

const Sales: React.FC = () => {

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

  return (
    <>
      <div className="frame"> 

        <input type="checkbox" id="menu" defaultChecked={true}></input>      

        <div className="row h-100">
          <div className="left-side col-md-2">
              <label htmlFor="menu" className="menu-close"><FontAwesomeIcon icon={faTimes} className="toggle-icon"/></label>
              <SideBar coreview="sales"/>
          </div>
          <div className="right-side col-md-10">
            <div className="toggle-menu">
              <div className="tempura"> Tempura</div>
              <label htmlFor="menu" className="menu-bar"><FontAwesomeIcon icon={faBars} className="toggle-icon"/></label>
            </div>
          <div className="right-body">
            <SingleValueCard type="text" title="Largest Margin Supplier" value="vitor" supplierID="1"/>
            <SingleValueCard type="text" title="test" value="vitor" />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
