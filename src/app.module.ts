import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// "This is a class that is decorated with a decorate [@Module] coming from the @nestjs/common module"
// "This basically turns this class into a module"
@Module({
  imports: [TasksModule],
})
export class AppModule {}
