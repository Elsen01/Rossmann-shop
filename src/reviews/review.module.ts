import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { ProductService } from "../products/product.service";
import { ProductModule } from "../products/product.module";
import { PaginationModule } from "../pagination/pagination.module";
import { CategoryModule } from "../categories/category.module";

@Module({
  controllers:[ReviewController],
  providers:[ReviewService,PrismaService,ProductService],
  imports:[ProductModule,PaginationModule,CategoryModule]
})
export class ReviewModule{}