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

  public deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    // no need to return anything
  }

  public updateTaskStatusById(id: string, status: TaskStatus): Task {
    // update task of given id
    // very simple because JavaScript passes objects by reference
    // it's bad practice to mutate the task directly
    // would be more bulletproof code if you replace it after validating that it exists
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
