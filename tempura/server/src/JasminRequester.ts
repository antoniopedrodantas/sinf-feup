import axios, { AxiosInstance} from 'axios';
import { resolve } from 'path';
import Querystring from "querystring";



class JasminRequester{
  protected readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: ""
    }
    );
  }

  static async getToken() {
    let body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: "application",
      grant_type: "client_credentials" 
    };
    let formData = Querystring.stringify(body);
    
    try {
      const response = await axios.post(
        "https://identity.primaverabss.com/connect/token",
        formData
      );

      if (response.status == 200) {
        console.log(response.data);
      }

    } catch (error) {
      console.log(error)
    }
    return "";
  }

  
}

export default JasminRequester;