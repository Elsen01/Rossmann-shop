import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { GetAllProductDto } from "./dto/get-all.product.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { ProductDto } from "./dto/product.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller("products")
@ApiBearerAuth()
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }
  
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto)
  }
  
  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id)
  }
  
  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug)
  }
  
  @Get('by-category/:categorySlug') 
  async getProductByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.byCategory(categorySlug)
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  @Post()
  async createProduct() {
    return this.productService.create()
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id,dto)
  }
  
  @HttpCode(200)
  @Delete(':id')
  @Auth('admin')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.delete(+id)
  }
  @Get(':id')
  @Auth()
  async getProduct(@Param('id') id : string) {
    return this.productService.byId(+id)
  }
   
}