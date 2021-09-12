import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task, { name: 'createTask' })
  create(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Mutation(() => Task, { name: 'updateTask' })
  update(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation(() => Task, { name: 'updateTaskStatus' })
  updateStatus(
    @Args('updateTaskStatusInput') updateTaskStatusInput: UpdateTaskStatusInput,
  ) {
    return this.taskService.updateStatus(updateTaskStatusInput);
  }

  @Mutation(() => String, { name: 'deleteTask' })
  remove(@Args('uid') uid: string) {
    return this.taskService.remove(uid);
  }
}
