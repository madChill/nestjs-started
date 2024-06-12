import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
 
  await app.listen(Number(process.env.APP_PORT) || 3000);
  console.log(
    `Application is running on: ${await app.getUrl()} - api gateway service`,
  );
}
bootstrap();
