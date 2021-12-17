import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/enums';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
