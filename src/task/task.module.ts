import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task } from './entities/task.entity';
import { TableColumnRepository } from '../table-column/table-column.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TableColumnRepository])],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
