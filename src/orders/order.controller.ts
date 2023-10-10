import { Controller, Get } from "@nestjs/common";
import { Auth } from "../auth/decorators/auth.decorator";
import { OrderService } from "./order.service";
import { CurrentUser } from "../auth/decorators/user.decorator";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }
  
  @Get()
  @Auth()
  async getAllOrders(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId)
  }
}