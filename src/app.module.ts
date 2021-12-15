import { Module } from '@nestjs/common';

// "This is a class that is decorated with a decorate [@Module] coming from the @nestjs/common module"
// "This basically turns this class into a module"
@Module({
  imports: [],
})
export class AppModule {}
