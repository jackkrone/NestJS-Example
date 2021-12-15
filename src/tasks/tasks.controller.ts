import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // following line is TS syntatic-sugar
  // TS auto creates a private property called tasksService with a value of TasksService
  constructor(private tasksService: TasksService) {}
}
