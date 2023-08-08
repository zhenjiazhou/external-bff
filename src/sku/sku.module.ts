import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { SkuService } from "./sku.service";
import { SkuClient } from "../http-clients/skuClient";
import { SkuController } from "./sku.controller";
import { CatalogClient } from "../http-clients/catalogClient";
import { SkuMiddleware } from "./sku.middleware";

@Module({
  providers: [SkuService, SkuClient, CatalogClient],
  controllers: [SkuController],
  exports: [SkuService],
  imports: [HttpModule, ConfigModule.forRoot()],
})
export class SkuModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    return consumer.apply(SkuMiddleware).forRoutes("*");
  }
}
