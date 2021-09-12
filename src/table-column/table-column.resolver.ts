import { Resolver } from '@nestjs/graphql';
import { TableColumnService } from './table-column.service';

@Resolver()
export class TableColumnResolver {
  constructor(private readonly tableColumnService: TableColumnService) {}
}
