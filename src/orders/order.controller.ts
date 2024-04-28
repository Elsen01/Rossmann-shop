import { Body, Controller, Get, Post } from "@nestjs/common";
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { OrderService } from './order.service'
import { OrderDto } from "./dto/order.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('orders')
@ApiTags('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}


	@Get()
	@Auth('admin')
	async getAllOrders() {
		return this.orderService.getAll()
	}
	@Get('by-user')
	@Auth()
	async getByUserId(@CurrentUser('id') userId: number) {
		return this.orderService.getByUserId(userId)
	}

	@Post()
	@Auth()
	async placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: number) {
		return this.orderService.placeOrder(dto, userId)
	}
	/*@Post()
	@Auth()
	async createPayment(@Body() paymentData: { amount: number; description: string; paymentMethodId: string }) {
		try {
			const payment = await this.orderService.createPayment(paymentData.amount, paymentData.description, paymentData.paymentMethodId);
			return payment;
		} catch (error) {
			return { error: error.message };
		}
	}*/
}
