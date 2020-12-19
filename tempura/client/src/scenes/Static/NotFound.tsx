import React , { useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
const logo =  require("../../assets/cry.gif")
import './styles/NotFound.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const NotFound: React.FC = () => {

  const history = useHistory();

  // checks for authentication
  useEffect(() => {

    // gets auth-token from the local storage
    const token = localStorage.getItem("auth-token");

    // token is not null
    if(token != null){

      try{

        // gets data from token
        const data = jwt.verify(token, 'secret');
        const { id } = data as TokenPayload;

      } catch(err) {
        history.push('/login');
      }

    }
    else{
      history.push('/login');
    }

  }, []);

  return (
    <>

      <div className="error-div">
        <img id="gif" src={logo} alt="logo" />
        <h3 className="error-404">404 Page not found!</h3>
        <button className="returnBtn" onClick={() => {history.goBack()}}> 
          <span><FontAwesomeIcon className="returnIcon" icon={faUndo} /> Return</span>
        </button>
      </div>

    </>
  );
};

export default NotFound;
