import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  // It's not necessary to use the public keyword
  public getAllTasks() {
    return this.tasks;
  }
}
