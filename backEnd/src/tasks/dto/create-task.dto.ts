import { IsNotEmpty, IsDateString, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  descrption: string;

  @IsDateString()
  @IsNotEmpty()
  date: Timestamp;

  @IsString()
  time: string;

  @IsDateString()
  @IsString()
  updatedAt: Timestamp;
}
