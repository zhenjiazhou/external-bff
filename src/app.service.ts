import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async getOrCreatNewCart(): Promise<any> {
    const options = {
      method: "get",
      baseURL: `https://${process.env.accountName}.${process.env.accountEnvironment}.com.br`,
      url: "/api/checkout/pub/orderForm?forceNewCart=true",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-VTEX-API-AppKey": process.env.X_VTEX_API_AppKey,
        "X-VTEX-API-AppToken": process.env.X_VTEX_API_AppToken,
      },
    } as AxiosRequestConfig;

    const response = await axios.request(options);
    return response.data;
  }
}
