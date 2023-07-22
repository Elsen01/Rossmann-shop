import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '../config/jwt.config'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
