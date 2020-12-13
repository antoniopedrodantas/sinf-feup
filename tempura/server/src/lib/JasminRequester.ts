import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from 'dotenv/types';
import { resolve } from 'path';
import Querystring from "querystring";
import { getRepository } from 'typeorm';
import { User } from '../entity/User';




class JasminRequester {

  protected readonly instance: AxiosInstance;
  protected userID: number;

  public constructor(user: User) {
    const jasminURL = `https://my.jasminsoftware.com/api/${process.env.ACCOUNT}/${process.env.SUBSCRIPTION}`;
    this.userID = user.id;
    this.instance = axios.create({
      baseURL: jasminURL
    }
    );
    

    this._initializeRequestInterceptors();
  }

  protected async getToken() {
    let body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: "application",
      grant_type: "client_credentials"
    };

    try {
      const user = await getRepository(User).findOne({ where: { id: this.userID } });
      if (!user) {
        throw new Error("User does not exist in database");
      }

      if (user.jasmin_token_time && user.jasmin_token && user.jasmin_token_time > new Date()) {
        return user.jasmin_token;
      }

      const response = await axios.post(
        "https://identity.primaverabss.com/connect/token",
        Querystring.stringify(body)
      );

      if (response.status == 200) {
        let now = new Date();
        let json: JasminResponse.Token = response.data;
        now.setSeconds(now.getSeconds() + json.expires_in);
        let jasmin_token = json.access_token;
        let jasmin_token_time = now;
        await getRepository(User).update(
          { id: this.userID },
          {
            jasmin_token: jasmin_token,
            jasmin_token_time
          }
        )
        console.log(jasmin_token === user.jasmin_token)
        return jasmin_token;
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  public getAccountsReceivable = () => this.instance.get<JasminResponse.AccountsReceivable[]>('/accountsReceivable/receipts');
  
  public getAccountsPayable = () => this.instance.get<JasminResponse.AccountsPayable[]>('/accountsPayable/payments');
  public getSupplierPartyByKey = (partyKey: string) => this.instance.get<JasminResponse.SupplierParty>(`/purchasesCore/supplierParties/${partyKey}`);
  public getSupplierParty = () => this.instance.get<JasminResponse.SupplierParty[]>("/purchasesCore/supplierParties/extension")
  public getAllPurchaseOrders = () => this.instance.get<JasminResponse.PurchaseOrder[]>('/purchases/orders');
  public getAllSaleOrders = () => this.instance.get<JasminResponse.SaleOrder[]>('/sales/orders');
  

  private _handleRequest = async (config: AxiosRequestConfig) => {
    config.headers["Authorization"] = "Bearer " + await this.getToken();
    config.headers["Content-Type"] = "application/json";
    return config;
  }


  private _initializeRequestInterceptors = () => {
    this.instance.interceptors.request.use(
      this._handleRequest
    );
  }

}

export default JasminRequester;