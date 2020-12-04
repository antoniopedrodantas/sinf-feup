import React from 'react';
import './styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons'
const logo =  require("../../assets/logo.svg")

const Login: React.FC = () => {
  return (
    <>
      <div className="login">
        <div className="loginContainer">
          <img id="logo" src={logo} alt="logo" />
          <hr id="loginHR" />
          <div id="loginText"> Login into your account</div>

          <form className="loginForm">
            
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
