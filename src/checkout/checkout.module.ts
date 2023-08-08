import { Module } from "@nestjs/common";
import { CheckoutService } from "src/checkout/checkout.service";
import { CheckoutController } from "src/checkout/checkout.controller";
import { CheckoutClient } from "../http-clients/checkoutClient";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [CheckoutService, CheckoutClient],
  controllers: [CheckoutController],
  exports: [CheckoutService],
  imports: [HttpModule, ConfigModule.forRoot()],
})
export class CheckoutModule {}
