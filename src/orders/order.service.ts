import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { productReturnObject } from "../products/return-product.object";
import { OrderDto } from "./dto/order.dto";
import * as process from "process";
import axios from 'axios';




@Injectable()
export class OrderService {
  private readonly shopId: string = 'YOUR_SHOP_ID';
  private readonly secretKey: string = 'YOUR_SECRET_KEY';
  private readonly apiUrl: string = 'https://api.yookassa.ru/v3/payments';

  constructor(private prisma: PrismaService) {
  }

  async getAll(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject
            }
          }
        }
      }
    });
  }

  /*async placeOrder(dto: OrderDto, userId: number) {
    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items
        },
        total,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });


    /!*const payment = await YooKassa.payment.create({
      amount: {
        value: total.toFixed(2),
        currency: "RUB"
      },
      payment_method_data: {
        type: "bank_card"
      },
      confirmation: {
        return_url: "http://localhost:3005/saccessfull"
      },
      description: `Order #${order.id}}`
    });
    return payment;
  }*!/
  }*/
  /* async createPayment(amount: number, description: string, paymentMethodId: string): Promise<any> {
     try {
       const response = await axios.post(
         this.apiUrl,
         {
           amount: {
             value: amount,
             currency: 'RUB', // or any other supported currency
           },
           confirmation: {
             type: 'redirect', // or 'embedded'
             return_url: 'https://example.com/success', // URL to redirect after successful payment
           },
           description,
           payment_method_id: paymentMethodId,
         },
         {
           headers: {
             Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64')}`,
           },
         },
       );
       return response.data;
     } catch (error) {
       throw new Error(`Failed to create payment: ${error.response.data.description}`);
       }
     }*/

  
}
