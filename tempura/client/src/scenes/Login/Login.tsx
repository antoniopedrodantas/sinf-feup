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
  const [showError, setShowError] = useState(false);


  const submit = async (event: any) => {
    
    event.preventDefault();

    // Gets username and password
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    // requests database for login
    await axios.post('http://localhost:8000/login', { username, password }).then(res => {
      
      // sets token on local storage
      localStorage.setItem('auth-token', res.data.token);

      // redirects to overview page
      history.push('/overview');
      setShowError(false);

    }).catch(err => {
      console.log(err);
      setShowError(true);
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
              { showError && <p className="err">Invalid credentials.</p>}
            </div>

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
