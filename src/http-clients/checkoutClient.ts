import { HttpService } from "@nestjs/axios";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { AxiosInstance } from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CheckoutClient implements OnModuleInit {
  private http: AxiosInstance;
  private BASE_URL: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.BASE_URL = `https://${this.configService.get("accountName")}.${this.configService.get(
      "accountEnvironment",
    )}.com.br`;
  }

  onModuleInit() {
    this.http = this.httpService.axiosRef;
  }

  public getOrCreateCart = (forceNewCart?: boolean) =>
    this.http.get<OrderForm>(this.routes.getOrCreateCart(forceNewCart));

  public getAllOrdersCart = (orderFormId: string) =>
    this.http.get<OrderForm>(this.routes.getAllOrdersCart(orderFormId));
  public addItem = (orderFormId: string | string[], items: any) =>
    this.http.post<OrderForm>(this.routes.addItem(orderFormId), { orderItems: [items] });

  public updateItem = (orderFormId: string | string[], items: any) =>
    this.http.post<OrderForm>(this.routes.updateItem(orderFormId), { orderItems: [items] });

  public addShippingData = (orderFormId: string | string[], shippingData: any) =>
    this.http.post<OrderForm>(this.routes.addShippingData(orderFormId), shippingData);

  public addPaymentData = (orderFormId: string | string[], paymentData: any) =>
    this.http.post<void>(this.routes.addPaymentData(orderFormId), { paymentData });

  private get routes() {
    const base = this.BASE_URL + "/api/checkout/pub";
    return {
      getOrCreateCart: (forceNewCart?: boolean) => `${base}/orderForm?forceNewCart=${forceNewCart}`,
      getAllOrdersCart: (orderFormId?: string | string[] | undefined) =>
        `${base}/orderForm/${orderFormId}?refreshOutdatedData=true'`,
      addItem: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/items`,
      updateItem: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/items/update`,
      addShippingData: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/attachments/shippingData`,
      addPaymentData: (orderFormId?: string | string[]) => `${base}/orderForm/${orderFormId}/attachments/paymentData`,
    };
  }
}
