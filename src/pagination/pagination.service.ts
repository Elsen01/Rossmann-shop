import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationService {
  constructor(private prisma: PaginationService) {
  }
}