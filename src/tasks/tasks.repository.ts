import { TaskStatus } from 'src/enums';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task) // Indicates the class is an entity repository of type task (next line seems redundant)
// You must provide the parent class Repository with a generic type so it knows what entity it is working with
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // Next line doesn't need await key because it's not communicating with DB
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // Next line is communicating with DB
    await this.save(task);
    return task;
  }
}
