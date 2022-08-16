import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const task = this.repository.create(createTaskDto);
    return this.repository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  findTask(name: string) {
    return this.repository
      .createQueryBuilder('task')
      .where('task.title = :title', { title: name })
      .getMany();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.repository.preload({
      id: Number(id),
      ...updateTaskDto,
    });
    if (!task) {
      throw new NotFoundException(`Tarefa ${id} not found`);
    }
    return this.repository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.repository.remove(task);
  }
}
