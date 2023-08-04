import { Body, Controller, Get, Post, Put, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { CheckoutService } from "src/checkout/checkout.service";
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { OrderItemDto } from "src/checkout/dto/add-item.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";

@ApiTags("checkout")
@Controller("checkout")
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get("/cart")
  @ApiQuery({ name: "forceNewCart", type: "string", required: false })
  async getOrCreateCart(@Query() forceNewCart: "true" | undefined, @Res({ passthrough: true }) response: Response) {
    await this.checkoutService.getOrCreateCart(forceNewCart).then((res) => {
      const result = [];
      res.headers["set-cookie"].forEach((item) => {
        const name = item.split(";")[0].split("=")[0];
        const value = item.split(";")[0].slice(name.length + 1);
        const options = {};
        for (let i = 1; i < item.split(";").length; i++) {
          const xx = item.split(";")[i].trim();
          if (!xx.split("=")[1]) {
            if (xx.split("=")[0] === "httponly") {
              options["httpOnly"] = true;
              continue;
            }
            options[xx.split("=")[0]] = true;
          }
        }
        result.push({
          name,
          value,
          options,
        });
      });

      result.forEach((item) =>
        response.cookie(item.name, item.value, {
          secure: false,
          // httpOnly: true,
          expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
        }),
      );
      response.send(res.data);
    });
  }

  @Post("/cart-items/:id")
  @ApiParam({ name: "id", type: "string" })
  async addItem(@Param() id: string, @Body() orderItem: OrderItemDto) {
    return await this.checkoutService.addItem(orderItem, id["id"]);
  }

  @Put("/cart-items/:id")
  @ApiParam({ name: "id", type: "string" })
  async updateItem(@Body() orderItem: OrderItemDto, @Param("id") id: string) {
    //why id is an object but no compile error？
    return await this.checkoutService.updateItem(orderItem, id);
  }
}
