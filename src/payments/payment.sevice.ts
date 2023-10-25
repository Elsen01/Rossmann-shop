import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderDto } from "../orders/dto/order.dto";
import Stripe from 'stripe';
import {UserService} from "../users/user.service";
import * as  PaymentIntentCreateParams from 'module'

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',

    },);

    return { clientSecret: paymentIntent.client_secret };
  }
}
