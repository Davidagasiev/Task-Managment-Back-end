import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';
import { TableColumnRepository } from '../table-column/table-column.repository';

@Injectable()
export class TaskService {
  constructor(
    private tableColumnRepository: TableColumnRepository,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const { name, description, columnUid } = createTaskInput;

    const column = await this.tableColumnRepository.findOneOrFail(columnUid);

    const task = this.taskRepository.create({
      name,
      description,
      column,
    });

    return this.taskRepository.save(task);
  }

  async update(updateTaskInput: UpdateTaskInput) {
    const { uid, name, description } = updateTaskInput;
    const task = await this.taskRepository.findOneOrFail(uid);

    task.name = name;
    task.description = description;

    return this.taskRepository.save(task);
  }

  async updateStatus(updateTaskStatusInput: UpdateTaskStatusInput) {
    const { uid, columnUid } = updateTaskStatusInput;
    const task = await this.taskRepository.findOneOrFail(uid);
    const column = await this.tableColumnRepository.findOneOrFail(columnUid);

    task.column = column;

    return this.taskRepository.save(task);
  }

  async remove(uid: string) {
    const task = await this.taskRepository.findOneOrFail(uid);
    await this.taskRepository.remove(task);
    return 'Success';
  }
}
