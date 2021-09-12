import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from './entities/table.entity';
import { CreateTableInput } from './dto/create-table.input';
import { UpdateTableInput } from './dto/update-table.input';

@Resolver(() => Table)
export class TableResolver {
  constructor(private readonly tableService: TableService) {}
}
