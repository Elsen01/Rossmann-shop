

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.sevice';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Body() body: { orderId: string, amount: number, description: string }) {
    const { orderId, amount, description } = body;
    const paymentResponse = await this.paymentService.createPayment(orderId, amount, description);
    return paymentResponse;
  }
}
