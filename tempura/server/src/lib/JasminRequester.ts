import axios, { AxiosInstance } from 'axios';
import { resolve } from 'path';
import Querystring from "querystring";
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

type JasminToken = {
  access_token: string,
  expires_in: number,
  token_type: String,
  scope: String
};


class JasminRequester {
  protected readonly instance: AxiosInstance;
  protected userID: number;

  public constructor(user: User) {
    this.userID = user.id;
    this.instance = axios.create({
      baseURL: `https://my.jasminsoftware.com/api/${process.env.ACCOUNT}/${process.env.SUBSCRIPTION}`
    }
    );

    if (!user.jasmin_token_time || !user.jasmin_token || user.jasmin_token_time <= new Date()) {
      this.getToken();
    }

  }

  protected async getToken() {
    let body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: "application",
      grant_type: "client_credentials"
    };

    try {
      const response = await axios.post(
        "https://identity.primaverabss.com/connect/token",
        Querystring.stringify(body)
      );

      if (response.status == 200) {
        let now = new Date();
        let json: JasminToken = response.data;
        now.setSeconds(now.getSeconds() + json.expires_in);
        let jasmin_token = json.access_token;
        let jasmin_token_time = now;
        await getRepository(User).update(
          { id: this.userID },
          {
            jasmin_token,
            jasmin_token_time
          }
        )
      }

    } catch (error) {
      console.log(error)
    }
  }


}

export default JasminRequester;