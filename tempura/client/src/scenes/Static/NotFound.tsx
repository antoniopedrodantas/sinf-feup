import React , { useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
const logo =  require("../../assets/cry.gif")
import './styles/NotFound.css';

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
        // TODO: change secret and add to a .env file possibly
        const data = jwt.verify(token, 'secret');
        const { id } = data as TokenPayload;

        // TODO: maybe do something with id later on
        console.log("User ID: ", id);

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
        <img id="logo" src={logo} alt="logo" />
        <h3 className="error-404">404 Page not found!</h3>
        <p className="error-404-p">
          The page you are looking for does not exist...
        </p>
      </div>

    </>
  );
};

export default NotFound;
