import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PaginationService } from "../pagination/pagination.service";
import { CategoryService } from "../categories/category.service";
import { PaginationModule } from "../pagination/pagination.module";
import { CategoryModule } from "../categories/category.module";

@Module({
  controllers:[ProductController],
  imports:[PaginationModule,CategoryModule],
  providers:[ProductService,PrismaService,PaginationService]
})
export class ProductModule{}