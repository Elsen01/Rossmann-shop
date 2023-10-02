import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
import { returnUserObject } from "../users/return-user.object";
import { UserDto } from "../users/dto/user.dto";
import { hash } from "argon2";
import { returnCategoryObject } from "./return-category.object";
import { CategoryDto } from "./dto/category.dto";
import { generateSlug } from "../utils/generate-slug";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {
  }

  async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      },
      select: returnCategoryObject
    });
    if (!category) {
      throw new Error("Category Not Found");
    }
    return category;
  }

  async create() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: ''
      }
    })
  }
  async update(id: number, dto: CategoryDto) {
        return this.prisma.category.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name)
      }
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id
      },
    });
  }
 
  
}