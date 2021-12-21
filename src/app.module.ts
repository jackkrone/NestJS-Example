import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

// "This is a class that is decorated with a decorate [@Module] coming from the @nestjs/common module"
// "This basically turns this class into a module"
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true, // keeps DB synched... whatever that means
    }),
    AuthModule,
  ],
})
export class AppModule {}
