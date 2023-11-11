import { Controller, Get, Param } from "@nestjs/common";
import { StatisticService } from "./statistic.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";

@Controller("statistics")
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {
  }
  
  @Get('main')
  @Auth('admin')
  async getMainStatistic(){
    return this.statisticService.getMain()
  }
}