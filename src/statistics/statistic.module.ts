import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { StatisticController } from "./statistic.controller";
import { StatisticService } from "./statistic.service";
import { UserService } from "../users/user.service";

@Module({
  controllers:[StatisticController],
  providers:[StatisticService,PrismaService,UserService]
})
export class StatisticModule{}