import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TableColumnService } from './table-column.service';
import { TableColumnResolver } from './table-column.resolver';
import { TableColumnRepository } from './table-column.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TableColumnRepository])],

  providers: [TableColumnResolver, TableColumnService],
})
export class TableColumnModule {}
