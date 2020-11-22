import React from 'react';
import './styles/Login.css';



const Login: React.FC = () => {
  return (
    <>
      <div className="login">
        <div className="loginContainer">

          {/*TODO: place logo here (não sei porque mas dá-me erro ao introduzir o svg*/}

          <hr id="loginHR" />
          <div id="loginText"> Login into your account</div>

          <form className="loginForm">
            
            <div className="credentials">
              <div className ="username">
                <span className="icon">i</span>
                <input />
              </div>
              <div className="password">
                <span className="icon">i</span>
                <input />
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
