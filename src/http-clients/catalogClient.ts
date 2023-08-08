import { HttpService } from "@nestjs/axios";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { AxiosInstance } from "axios";
import { ConfigService } from "@nestjs/config";
import { Category } from "@vtex/api/lib/clients/apps/catalogGraphQL/category";

@Injectable()
export class CatalogClient implements OnModuleInit {
  private http: AxiosInstance;
  private BASE_URL: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.BASE_URL = `https://${this.configService.get("accountName")}.${this.configService.get(
      "accountEnvironment",
    )}.com.br/api/catalog_system`;
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

  public categories = (treeLevel: number) => this.http.get<Category[]>(`/pub/category/tree/${treeLevel}/`);

  public getSkusById = (productId: string) =>
    this.http.get<ProductDetail[]>(this.BASE_URL + `/pub/products/variations/${productId}`);

  public;
  productDetail = (productId: string) => this.http.get<ProductDetail>(`/pub/products/variations/${productId}`);
}
