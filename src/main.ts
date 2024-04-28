import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule,{cors: false})
	app.enableCors({credentials: true,origin: true})
	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	const config = new DocumentBuilder()
		.setTitle('Rossmann-Shop')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document)
	app.enableCors()
	await app.listen(3005)
}

bootstrap()	
