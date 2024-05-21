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
import { OrderController } from "./orders/order.controller";
import { PaymentModule } from "./payments/payment.module";
import serveStatic from "serve-static";
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";
import { FileModule } from './files/file.module'


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:`${path}/uploads`,
      serveRoot:'/uploads'
    })
    
    ,ConfigModule.forRoot(), AuthModule, UserModule, CategoryModule, 
    ReviewModule, StatisticModule, OrderModule,ProductModule,PaymentModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {
}
