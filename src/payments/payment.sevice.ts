import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService) {}

  async createPayment(orderId: string, amount: number, description: string): Promise<any> {
    const shopId = this.configService.get('SHOP_ID');
    const secretKey = this.configService.get('STRIPE_SECRET_KEY');
    const apiUrl = 'https://api.yookassa.ru/v3/payments';

    const response = await axios.post(
      apiUrl,
      {
        amount: {
          value: amount.toFixed(2),
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: 'https://yourwebsite.com/success', // URL to redirect after successful payment
        },
        description,
        capture: true,
        metadata: {
          orderId,
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`,
        },
      },
    );

    return response.data;
  }
}
