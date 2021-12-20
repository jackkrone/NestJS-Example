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

  // I don't need async before following method because there is no accompanying await keyword
  // Need to return a promise still as the function this function calls returns a promise
  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async deleteTaskById(id: string): Promise<void> {
    // can use remove() or delete() method, I use delete()
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      // return 404 if task doesn't exist
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Note: this method construction is better for scalability than calling getTaskById first to identify if the task exists
    // This method requires only one database operation, whereas the alternative requires two
  }

  public async updateTaskStatusById(
    id: string,
    status: TaskStatus,
  ): Promise<Task> {
    // very simple because JavaScript passes objects by reference
    const task = await this.getTaskById(id); // must use await bc this method makes a DB operation now

    // It should not be a problem to mutate task directly now as task object is copied from database
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
