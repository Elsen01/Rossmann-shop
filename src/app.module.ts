import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./users/user.module";
import { CategoryModule } from "./categories/category.module";
import { ReviewModule } from "./reviews/review.module";
import { StatisticModule } from "./statistics/statistic.module";
import { OrderModule } from "./orders/order.module";
import { ProductModule } from "./products/product.module";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, CategoryModule, 
    ReviewModule, StatisticModule, OrderModule,ProductModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {
}
