import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// All this function does is creat and start e a new nest server. We pass it our root module AppModule
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Telling NestJS: "whenever you encounter a validation decorator I want you to run your validation pipe"
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
