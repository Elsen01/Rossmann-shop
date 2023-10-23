import { Controller, Post, Body } from '@nestjs/common';

import { PaymentService } from './payment.sevice';
import { Auth } from "../auth/decorators/auth.decorator";

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment')
  @Auth()
  async createPaymentIntent(@Body() body: { amount: number }): Promise<{ clientSecret: string }> {
    return this.paymentService.createPaymentIntent(body.amount);
  }
}
