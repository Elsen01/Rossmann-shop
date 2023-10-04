import { Controller, Get, Param } from "@nestjs/common";
import { StatisticService } from "./statistic.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";

@Controller("statistics")
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {
  }
  
  @Get('main')
  @Auth()
  async getMainStatistic(@CurrentUser('id')id: number,@Param('productId') productId: string){
    return this.statisticService.getMain(id,+productId)
  }
}