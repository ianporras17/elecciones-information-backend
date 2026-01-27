import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
<<<<<<< HEAD
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
=======
>>>>>>> origin/feat-rooms

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para frontend (Vite)
  app.enableCors({
    origin: 'http://localhost:5173', // frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT') ?? 3000);

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Elecciones API')
    .setDescription('Documentación de autenticación y salud')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');

  console.log(`API running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
