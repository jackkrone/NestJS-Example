import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './DTOs/create-task.dto';
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

  // When a post request is received, Nest will assign values from the request body
  // ... to the appropriate parameters as defined by the CreateTaskDto class
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
