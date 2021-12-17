import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/enums';

// DTO that enables user to optionally filter the tasks that they get
// Don't use typescript optional parameter notation as TS doesn't exist at runtime
// Instead, use class-validator's @IsOptional() decorator
export class GetTasksFilterDto {
  // ensure the task status is a valid enum type
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  // Ensure search term is not empty
  @IsOptional()
  @IsString() // seems irrelevant, seems like anything in a URI parameter is interpreted as a string
  search: string;
}
