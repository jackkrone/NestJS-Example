import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task) // Indicates the class is an entity repository of type task (next line seems redundant)
// You must provide the parent class Repository with a generic type so it knows what entity it is working with
export class TasksRepository extends Repository<Task> {}
