import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaService } from "./prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle("Rossmann-Shop")
    .setDescription("The shop API description")
    .setVersion("1.0")
    .addTag("Online-Shop")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors();
  await app.listen(3005);
}

bootstrap();
