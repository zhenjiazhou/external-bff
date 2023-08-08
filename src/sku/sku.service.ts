import { Injectable } from "@nestjs/common";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { SkuClient } from "../http-clients/skuClient";
import { CatalogClient } from "../http-clients/catalogClient";

@Injectable()
export class SkuService {
  constructor(private readonly skuClient: SkuClient, private readonly catalogClient: CatalogClient) {}

  async getAllProduct(categoryId: string) {
    const response = await this.skuClient.getProductAndSkuIDs(categoryId);
    const productIds = Object.keys(response.data);
    console.log(productIds);
    return await Promise.all(
      productIds.map(async (id) => {
        return this.catalogClient.getSkusById(id);
      }),
    ).then((result) => {
      return result;
    });
  }

  async getSkuContext(@Param() SkuId: string) {
    return await this.skuClient.getContextBySkuID(SkuId).then((res) => {
      return res.data;
    });
  }
}
