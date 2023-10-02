import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(private prisma: ProductService) {
  }
}