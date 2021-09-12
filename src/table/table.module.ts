import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TableService } from './table.service';
import { TableResolver } from './table.resolver';
import { TableRepository } from './table.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TableRepository])],
  providers: [TableResolver, TableService],
})
export class TableModule {}
