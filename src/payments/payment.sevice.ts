import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderDto } from "../orders/dto/order.dto";
import Stripe from 'stripe';
import {UserService} from "../users/user.service";
import * as  PaymentIntentCreateParams from 'module'
import { PaymentDto } from "./dto/payment.dto";

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(dto: PaymentDto): Promise<{ clientSecret: string }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: dto.amount * 100,
      currency: dto.currency,

    },);

    return { clientSecret: paymentIntent.client_secret };
  }
}