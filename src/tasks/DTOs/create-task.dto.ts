import { IsNotEmpty } from 'class-validator';

// Class name below is proper NestJS naming convention for DTOs
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
