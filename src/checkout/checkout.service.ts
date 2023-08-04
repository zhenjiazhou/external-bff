import { Injectable } from "@nestjs/common";
import { OrderItemDto } from "src/checkout/dto/add-item.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { CheckoutClient } from "../http-clients/checkoutClient";

@Injectable()
export class CheckoutService {
  constructor(private readonly clients: CheckoutClient) {}

  async addItem(orderItem: OrderItemDto, @Param() id: string) {
    const currentItems = await this.clients.getAllOrdersCart(id).then((res) => res.data.items);
    const updatedItem = this.updateItemQuantity(currentItems, orderItem);
    return await this.clients.addItem(id, updatedItem).then((res) => res.data.items);
  }

  async updateItem(orderItem: OrderItemDto, id: string) {
    return await this.clients.updateItem(id, orderItem).then((res) => {
      return res.data.items;
    });
  }

  async getOrCreateCart(forceNewCart: "true" | undefined) {
    return await this.clients.getOrCreateCart(forceNewCart === "true");
  }

  private updateItemQuantity = (currentItems: OrderFormItem[], orderItem: OrderItem): OrderItem => {
    const itemIndex = currentItems.findIndex((item) => item.id === orderItem.id);

    if (itemIndex !== -1) {
      orderItem.quantity += currentItems[itemIndex].quantity;
    }

    return orderItem;
  };
}
