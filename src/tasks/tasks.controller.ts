import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { GetTasksFilterDto } from './DTOs/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './DTOs/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // following line is TS syntatic-sugar
  // TS auto creates a private property called tasksService with a value of TasksService
  constructor(private tasksService: TasksService) {}

  // When a get request comes in to the TasksController, it's handled by the appropriate Get handler below
  // localhost:3000/tasks
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    // Run tasksService.getTasksWithFilters if filters are define
    // Run tasksService.getAllTasks if no filters defined
    return this.tasksService.getTasks(filterDto);
  }

  // localhost:3000/tasks/lk234hg438j
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // When a post request is received, Nest will assign values from the request body
  // ... to the appropriate parameters as defined by the CreateTaskDto class
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // localhost:3000/tasks/lk234hg438j
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    // not necessary to includ return statemetn but also not problematic here
    return this.tasksService.deleteTaskById(id);
  }

  // new status is sent in the body
  // status in the URL (non-variable) is just to indicate what the patch is updating (this is proper REST convention)
  // Can't use only one DTO because you need a different one for both Param and Body
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
