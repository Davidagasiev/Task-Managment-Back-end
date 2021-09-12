import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { TableService } from './table.service';
import { Table } from './entities/table.entity';
import { CreateTableInput } from './dto/create-table.input';
import { UpdateTableInput } from './dto/update-table.input';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Table)
export class TableResolver {
  constructor(private readonly tableService: TableService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Table, { name: 'createTable' })
  create(
    @Args('createTableInput') createTableInput: CreateTableInput,
    @CurrentUser() user: User,
  ): Promise<Table> {
    return this.tableService.create(createTableInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Table, { name: 'updateTable' })
  update(
    @Args('updateTableInput') updateTableInput: UpdateTableInput,
    @CurrentUser() user: User,
  ): Promise<Table> {
    return this.tableService.update(updateTableInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'deleteTable' })
  delete(@Args('uid') uid: string, @CurrentUser() user: User): Promise<string> {
    return this.tableService.delete(uid, user);
  }
}
