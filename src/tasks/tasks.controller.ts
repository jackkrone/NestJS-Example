import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskStatus } from 'src/enums';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // following line is TS syntatic-sugar
  // TS auto creates a private property called tasksService with a value of TasksService
  constructor(private tasksService: TasksService) {}

  // When a get request comes in to the TasksController, it's handled by the appropriate Get handler below
  // It's probably not necessary to add the return type as TS infers it, but I have it anyways (two lines below)
  // localhost:3000/tasks
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // localhost:3000/tasks/lk234hg438j
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // When a post request is received, Nest will assign values from the request body
  // ... to the appropriate parameters as defined by the CreateTaskDto class
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  // localhost:3000/tasks/lk234hg438j
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    // not necessary to includ return statemetn but also not problematic here
    return this.tasksService.deleteTaskById(id);
  }

  // HTTP Patch request is to update
  // The new status is sent in the body
  // status in the URL (non-variable) is just to indicate what the patch is doing
  // Not worthwhile to use DTOs because you need a different one for both Param and Body
  // Each only have one value associated with them so DTO wouldn't save time
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
