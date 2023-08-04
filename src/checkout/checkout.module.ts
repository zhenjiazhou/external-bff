import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CheckoutService } from "src/checkout/checkout.service";
import { CheckoutController } from "src/checkout/checkout.controller";
import { CheckoutClient } from "../http-clients/checkoutClient";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { CheckoutMiddleware } from "./checkout.middleware";

@Module({
  providers: [CheckoutService, CheckoutClient],
  controllers: [CheckoutController],
  exports: [CheckoutService],
  imports: [HttpModule, ConfigModule.forRoot()],
})
export class CheckoutModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    return consumer.apply(CheckoutMiddleware).forRoutes("*");
  }
}
