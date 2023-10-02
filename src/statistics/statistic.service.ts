import { Injectable } from "@nestjs/common";

@Injectable()
export class StatisticService {
  constructor(private prisma: StatisticService) {
  }
}