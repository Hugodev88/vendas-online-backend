import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS com configurações padrão
  app.enableCors({
    origin: 'http://localhost:5173', // Origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permitir envio de cookies
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
