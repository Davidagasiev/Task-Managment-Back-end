import { EntityRepository, Repository } from 'typeorm';

import { TableColumn } from './entities/table-column.entity';

@EntityRepository(TableColumn)
export class TableColumnRepository extends Repository<TableColumn> {}
