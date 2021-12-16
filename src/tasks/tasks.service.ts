import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // It's not necessary to use the public keyword
  // It's also not necessary to add the return type as TS infers it
  public getAllTasks(): Task[] {
    return this.tasks;
  }
}
