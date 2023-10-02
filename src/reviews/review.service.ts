import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewService {
  constructor(private prisma: ReviewService) {
  }
}