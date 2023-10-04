import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserService } from "../users/user.service";

@Injectable()
export class StatisticService {
  constructor(private prisma: PrismaService,
              private userService: UserService) {
  }
  
  async getMain(userId: number, productId: number) {
    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: {
            select: {
              price: true
            }
          }
        }
      },
      reviews: true
    })
    return [
      {
        name: 'Orders',
        value: user.orders.length
      },
      {
        name: 'Reviews',
        value: user.reviews.length
      },
      {
        name: 'Total amount',
        value: 1000
      }
    ]
  }
}