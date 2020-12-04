import React, { useState } from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const logo =  require("../../assets/logo.svg")

const Login: React.FC = () => {

  // Connection with Backend

  const history = useHistory();

  const submit = async (event: any) => {
    
    event.preventDefault();

    // Gets username and password
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    await axios.post('http://localhost:8000/login', { username, password }).then(res => {
      console.log(res);
      console.log(res.data);
      history.push('/overview');
    }).catch(err => {
      console.log(err);
    });
    
  };
  
  // Frontend

  return (
    <>
      <div className="login">
        <div className="loginContainer">
          <img id="logo" src={logo} alt="logo" />
          <hr id="loginHR" />
          <div id="loginText"> Login into your account</div>

          <form className="loginForm" onSubmit={submit}>
            
            <div className="credentials">
              <div className ="username">
                <span className="icon1"><FontAwesomeIcon icon={faUser} /></span>
                <input type="text" id="username" placeholder="username" />
              </div>
              <div className="password">
                <span className="icon2"><FontAwesomeIcon icon={faLock} /> </span>
                <input type="password" id="password" placeholder="password" />
              </div>
            </div>

            {/*TODO: add onclick event later */}
            <button className="loginButton" type="submit"> 
              <span> Log in</span>
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

export default Login;
