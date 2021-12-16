import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // following line is TS syntatic-sugar
  // TS auto creates a private property called tasksService with a value of TasksService
  constructor(private tasksService: TasksService) {}

  // Whenever a get request comes in to the TasksController, the getAllTasks method handler will handle it
  // It's not necessary to add the return type as TS infers it, but I have it anyways (two lines below)
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // When a post request is received, NestJS will assign the body.title and body.description
  // ... to  the title and description parameters... it ignores any other body properties
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
