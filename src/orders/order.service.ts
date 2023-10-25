import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { productReturnObject } from "../products/return-product.object";
import { OrderDto } from "./dto/order.dto";



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
    return order

  
}
}
