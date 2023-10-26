import { Controller, Post, Body } from '@nestjs/common';

import { PaymentService } from './payment.sevice';
import { Auth } from "../auth/decorators/auth.decorator";
import { OrderDto } from "../orders/dto/order.dto";
import { PaymentDto } from "./dto/payment.dto";

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment')
  @Auth()
  async createPaymentIntent(@Body() dto: PaymentDto): Promise<{ clientSecret: string }> {
    return this.paymentService.createPaymentIntent(dto);
  }
}