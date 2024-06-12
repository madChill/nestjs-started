import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
export const AUTH_PACKAGE_NAME = "user";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url:process.env.MANAGEMENT_SERVICE,
      package: AUTH_PACKAGE_NAME,
      protoPath: 'src/proto/user.proto',
    },
  });
  await app.startAllMicroservices();
  await app.listen(5001);
  console.log(`Application is running on2: ${await app.getUrl()}`);
}
bootstrap();
