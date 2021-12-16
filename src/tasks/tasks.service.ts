import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/enums';
import { Task } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTOs/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // It's not necessary to use the public keyword
  // It's also not necessary to add the return type as TS infers it
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      // The following construction is ideal because you can change the value of OPEN
      // ... in the enums file without having to change anything here
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
