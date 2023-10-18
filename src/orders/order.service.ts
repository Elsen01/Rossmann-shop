import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { productReturnObject } from "../products/return-product.object";
import { OrderDto } from "./dto/order.dto";
import * as process from "process";
import * as YooKassa from "yookassa";


const yooMoney = new YooKassa({
  shopId: process.env['SHOP_ID'],
  secretKey:process.env['PAYMENT_TOKEN ']
})


@Injectable()
export class OrderService {
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

  async placeOrder(dto: OrderDto, userId: number) {
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


    const payment = await YooKassa.payment.create({
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
  }
}
