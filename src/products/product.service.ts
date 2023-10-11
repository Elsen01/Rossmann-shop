import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginationService } from "../pagination/pagination.service";
import { EnumProductSort, GetAllProductDto } from "./dto/get-all.product.dto";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { productReturnObject, productReturnObjectFullest } from "./return-product.object";
import { ProductDto } from "./dto/product.dto";
import { generateSlug } from "../utils/generate-slug";

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
      {};

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

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }, select: productReturnObjectFullest
    });
    if (!product) throw new NotFoundException("Product Not Found");
    return product;

  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      },
      select: productReturnObjectFullest
    });
    if (!product) throw new NotFoundException("Product Not Found");
    return product;
  }

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: productReturnObjectFullest
    });
    if (!products) throw new NotFoundException("Product Not Found");
    return products;
  }

  async getSimilar(id: number) {
    const currentProduct = await this.byId(id);

    if (!currentProduct) throw new NotFoundException("Current Product Not Found");


    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.name
        }, NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      select: productReturnObject
    });
    return products;
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        description: "",
        slug: "",
        name: "",
        price: 0
      }
    });
    return product.id;
  }

  async update(id: number, dto: ProductDto) {
    const { description, name, price, images, categoryId } = dto;

    return this.prisma.product.update({
      where: {  
        id
      },
      data: {
        description,
        name,
        images,
        price,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    });
  }
  
  async delete(id: number) {
    return this.prisma.product.delete({where: { id }})
  }

}