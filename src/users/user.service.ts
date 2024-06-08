 import {
  BadRequestException, HttpException, HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from "../prisma.service";
import { returnUserObject } from "./return-user.object";
import { Prisma } from "@prisma/client";
import { UserDto } from "./dto/user.dto";
import { hash } from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }
  async byId(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true
          }
        },
        ...selectObject
      }
    });
    if (!user) {
      throw new Error("User Not Found");
    }
    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException("Email already in use");

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password
      }
    });
  }

  async toggleFavorite(userId: number, productId: number) {
    const user = await this.byId(userId);

    if (!user) throw new NotFoundException("User Not found");


    const isExist = user.favorites.some(product => product.id === productId);

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        favorites: {
          [isExist ?  'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    });
    return { message: "Success" };
  }
  
  async getAllUser() {
    return this.prisma.user.findMany({
      select: returnUserObject
    })
  }
  
  async delete(id:number) {
    const delUser = await this.prisma.user.findUnique({where:{id}})
    if (!delUser) throw new HttpException(`User ${id} Not Found`, HttpStatus.NOT_FOUND)
    
    if  (delUser.id ) {
      return this.prisma.user.delete({where:{id}})
      
    }
  }

  async getById(id: number) {
    const findUser = await this.prisma.user.findUnique({where:{id}})
    if (!findUser) throw new HttpException(`User ${id} Not Found`,HttpStatus.NOT_FOUND)

    return findUser
  }
}
