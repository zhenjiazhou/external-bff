import { Controller, Get } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { SkuService } from "./sku.service";

@ApiTags("sku")
@Controller("sku")
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Get("/all-product/:categoryId")
  @ApiParam({ name: "categoryId", type: "string" })
  async getAllProduct(@Param() categoryId: string) {
    return await this.skuService.getAllProduct(categoryId["categoryId"]);
  }

  @Get("/sku-context/:skuId")
  @ApiParam({ name: "skuId", type: "string" })
  async getSkuContext(@Param("skuId") skuId: string) {
    //why id is an object but no compile error？
    return await this.skuService.getSkuContext(skuId);
  }
}
