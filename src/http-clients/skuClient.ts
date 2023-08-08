import { HttpService } from "@nestjs/axios";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { AxiosInstance } from "axios";
import { ConfigService } from "@nestjs/config";
import { ProductIdToSKUId } from "../types/productIdToSKUId";

@Injectable()
export class SkuClient implements OnModuleInit {
  private http: AxiosInstance;
  private readonly BASE_URL: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.BASE_URL = `https://${this.configService.get("accountName")}.${this.configService.get(
      "accountEnvironment",
    )}.com.br`;
  }

  onModuleInit() {
    this.http = this.httpService.axiosRef;
    this.setHttpHeaders(); // set default headers
  }

  private setHttpHeaders() {
    this.http.defaults.headers.common["X-VTEX-API-AppKey"] = this.configService.get("X_VTEX_API_AppKey");
    this.http.defaults.headers.common["X-VTEX-API-AppToken"] = this.configService.get("X_VTEX_API_AppToken");
    this.http.defaults.headers.common["Accept"] = "application/json";
    this.http.defaults.headers.common["Content-Type"] = "application/json";
  }

  public getProductAndSkuIDs = (categoryId: string) => {
    return this.http
      .get<ProductIdToSKUId>(
        this.BASE_URL + `/api/catalog_system/pvt/products/GetProductAndSkuIds?categoryId=${categoryId}`,
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  };
  // .catch((err) => {
  //   console.log(err);
  // });
  // };

  public getContextBySkuID = (skuId: string) =>
    this.http.get<SkuContex>(this.BASE_URL + `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`);
}
