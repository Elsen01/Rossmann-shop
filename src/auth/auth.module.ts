import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '../config/jwt.config'
import { UserService } from "../users/user.service";
import { UserModule } from "../users/user.module";

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService ,UserService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule
	]
})
export class AuthModule {}
