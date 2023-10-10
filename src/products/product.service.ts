import { Injectable } from "@nestjs/common";
import { PaginationService } from "../pagination/pagination.service";
import { EnumProductSort, GetAllProductDto } from "./dto/get-all.product.dto";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,
              private paginationService: PaginationService) {
  }

  async getAll(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput [] = [];

    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: "asc" });
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({ price: "desc" });
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({ createdAt: "asc" });

    } else {
      prismaSort.push({ createdAt: "desc" });
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
      OR: [
        {

          category: {
            name: {
              contains: "searchTerm",
              mode: "insensitive"
            }
          }
        },
        {
          name: {
            contains: "searchTerm",
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: "searchTerm",
            mode: "insensitive"
          
        }
    }
  ]

  } :
    {
    }

    // @ts-ignore
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage
    });
    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter
      })
    };

  }
}