import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../auth/user.entity';
import { CurrentUser } from '../auth/user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { TableColumnService } from './table-column.service';
import { TableColumn } from './entities/table-column.entity';
import { CreateTableColumnInput } from './dto/create-table-column.input';
import { UpdateTableColumnInput } from './dto/update-table-column.input';

@Resolver()
export class TableColumnResolver {
  constructor(private readonly tableColumnService: TableColumnService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TableColumn, { name: 'createTableColumn' })
  create(
    @Args('createTableColumnInput')
    createTableColumnInput: CreateTableColumnInput,
    @CurrentUser() user: User,
  ): Promise<any> {
    return this.tableColumnService.create(createTableColumnInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TableColumn, { name: 'updateTableColumn' })
  update(
    @Args('updateTableColumnInput')
    updateTableColumnInput: UpdateTableColumnInput,
    @CurrentUser() user: User,
  ): Promise<TableColumn> {
    return this.tableColumnService.update(updateTableColumnInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'deleteTableColumn' })
  delete(@Args('uid') uid: string, @CurrentUser() user: User): Promise<string> {
    return this.tableColumnService.delete(uid, user);
  }
}
