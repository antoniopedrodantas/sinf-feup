import React, { useState } from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons'

import { request } from 'http';

const logo =  require("../../assets/logo.svg")

const Login: React.FC = () => {

  // Connection with Backend

  const submit = async () => {
    
    // Gets username and password
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    
    const req = request(
      {
        host: 'localhost',
        port: '8000',
        path: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      response => {
        console.log(response); // 200
      }
    );
     
    req.write(JSON.stringify({
      username: username,
      password: password
    }));
     
    req.end();
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
