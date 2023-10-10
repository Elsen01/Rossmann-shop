import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PaginationService } from "../pagination/pagination.service";

@Module({
  controllers:[ProductController],
  providers:[ProductService,PrismaService,PaginationService]
})
export class ProductModule{}