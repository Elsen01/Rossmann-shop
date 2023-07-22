import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {
}
