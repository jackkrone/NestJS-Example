import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from 'src/enums';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { GetTasksFilterDto } from './DTOs/get-tasks-filter.dto';
import { Task } from './task.entity'; // Now we import a task entity instead of a task model
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // // It's not necessary to use the public keyword
  // // It's also not necessary to add the return type as TS infers it
  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   // define temp arr to hold result
  //   // Is this a proper copy of the array? Given that JS passes objects by reference
  //   let tasks = this.getAllTasks();

  //   // filter with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   // filter with search
  //   // would help to use .toLowerCase()
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   // return final result
  //   return tasks;
  // }

  // Must define as async because we are interacting with a databse now
  // return type must now be a promise
  public async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id); // findOne is a typeORM method, returns first entry that satisfies matching condition

    // Throw exception if nothing is found
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  // public createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     // The following construction is ideal because you can change the value of OPEN
  //     // ... in the enums file without having to change anything here
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // public deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   // no need to return anything
  // }

  // public updateTaskStatusById(id: string, status: TaskStatus): Task {
  //   // update task of given id
  //   // very simple because JavaScript passes objects by reference
  //   // it's bad practice to mutate the task directly
  //   // would be more bulletproof code if you replace it after validating that it exists
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
