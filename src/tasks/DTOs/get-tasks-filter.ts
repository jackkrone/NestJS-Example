import { TaskStatus } from 'src/enums';

// DTO that enables user to optionally filter the tasks that they get
export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
