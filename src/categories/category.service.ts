import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService {
  constructor(private prisma: CategoryService) {
  }
}