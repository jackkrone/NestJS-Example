import { TaskStatus } from 'src/enums';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { GetTasksFilterDto } from './DTOs/get-tasks-filter.dto';
import { Task } from './task.entity';

@EntityRepository(Task) // Indicates the class is an entity repository of type task (next line seems redundant)
// You must provide the parent class Repository with a generic type so it knows what entity it is working with
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    // use query builder... creates query for Tasks... prevents you from having to use SQL syntax
    // let's you build your query based on certain conditions, which means you don't have to build situationally dependent queries
    const query = this.createQueryBuilder('task'); // method argument is name of table

    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }

    if (search) {
      // LIKE word enables partial matches within sentences
      // use LOWER to make sure we catch case insensitive matches as well
      query.andWhere(
        'LOWER(task.title) LIKE :search  OR LOWER(task.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` }, // percentage signs enable partial matches within a word
        // ^^^ I could have wrapped :search in LOWER() if I didn't use toLowerCase()
      );
    }

    const tasks = await query.getMany(); // queries all, with conditions applied above
    return tasks;
  }

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
