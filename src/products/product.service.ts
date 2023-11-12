import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginationService } from "../pagination/pagination.service";
import { EnumProductSort, GetAllProductDto } from "./dto/get-all.product.dto";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { productReturnObject, productReturnObjectFullest } from "./return-product.object";
import { ProductDto } from "./dto/product.dto";
import { generateSlug } from "../utils/generate-slug";
import { convertToNumber } from "../utils/convert-to-number";
import { CategoryService } from "../categories/category.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,
              private paginationService: PaginationService,
              private categoryService: CategoryService) {
  }

  async getAll(dto: GetAllProductDto = {}) {

    // @ts-ignore
    const { perPage, skip } = this.paginationService.getPagination(dto);
    
    const filters = this.createFilter(dto)

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage
    });
    return {
      products,
      length: await this.prisma.product.count({
        where: filters
      })
    };

  }

  private getSortOption(sort: EnumProductSort): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductSort.HIGH_PRICE:
        return [{ price: "asc" }];
      case EnumProductSort.LOW_PRICE:
        return [{ price: "desc" }];
      case EnumProductSort.OLDEST:
        return [{ createdAt: "asc" }];
      default: {
        return [{ createdAt: "desc" }];
      }
    }

  }

  private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = [];

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm));

    if (dto.ratings) filters.push(this.getRatingFilter(dto.ratings.split("|").map(rating => +rating)));

    if (dto.minPrice || dto.maxPrice) filters.push(this.getPriceFilter(
        convertToNumber(dto.minPrice),
        convertToNumber(dto.maxPrice)
      )
    );
    if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))
    
    return filters.length ? { AND: filters } :{}
  }

  private getSearchTermFilter(searchFilter: string): Prisma.ProductWhereInput {
    return {
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

    };
  }

  // @ts-ignore
  private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
    return {
      reviews: {
        some: {
          rating: {
            in: ratings
          }
        }
      }
    };
  }

  // @ts-ignore
  private getPriceFilter(minPrice: number, maxPrice: number): Prisma.ProductWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined;
    if (minPrice) {
      priceFilter = {
        ...priceFilter,
        gte: minPrice
      };
    }
    if (maxPrice) {
      priceFilter = {
        ...priceFilter,
        lt: maxPrice
      };
    }
    return {
      price: priceFilter
    };

  }


  private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
    return {
      categoryId
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
    
    await this.categoryService.byId(categoryId)

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
    return this.prisma.product.delete({ where: { id } });
  }

}