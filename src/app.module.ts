import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './users/user.module'
import { CategoryModule } from './categories/category.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, CategoryModule],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
