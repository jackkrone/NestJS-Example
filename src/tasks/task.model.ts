import { TaskStatus } from 'src/enums';

// "We can a define model as a class or an interface"
// interface will do for now, it is more simple than using a class
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
