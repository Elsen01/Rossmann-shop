import { Body, Controller, Get, Post } from "@nestjs/common";
import { Auth } from '../auth/decorators/auth.decorator'
import { OrderService } from './order.service'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { OrderDto } from "./dto/order.dto";

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@Auth()
	async getAllOrders(@CurrentUser('id') userId: number) {
		return this.orderService.getAll(userId)
	}

	@Post()
	@Auth()
	async placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: number) {
		return this.orderService.placeOrder(dto, userId)
	}
}
