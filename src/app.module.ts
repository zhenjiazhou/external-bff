import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CheckoutModule } from "src/checkout/checkout.module";
import { ConfigModule } from "@nestjs/config";
import { SkuModule } from "src/sku/sku.module";

@Module({
  imports: [CheckoutModule, ConfigModule.forRoot(), SkuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
