import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// All this function does is creat and start e a new nest server. We pass it our root module AppModule
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
