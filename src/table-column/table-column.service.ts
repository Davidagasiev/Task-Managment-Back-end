import { ForbiddenException, Injectable } from '@nestjs/common';

import { User } from '../auth/user.entity';
import { TableRepository } from '../table/table.repository';
import { TableColumnRepository } from './table-column.repository';
import { CreateTableColumnInput } from './dto/create-table-column.input';
import { UpdateTableColumnInput } from './dto/update-table-column.input';

@Injectable()
export class TableColumnService {
  constructor(
    private tableColumnRepository: TableColumnRepository,
    private readonly tableRepository: TableRepository,
  ) {}

  async create(createTableColumnInput: CreateTableColumnInput, user: User) {
    const { name, tableUid } = createTableColumnInput;
    const table = await this.tableRepository.findOneOrFail(tableUid);

    if (table.user.uid !== user.uid) {
      throw new ForbiddenException();
    }

    const column = this.tableColumnRepository.create({
      name,
      table,
    });

    return this.tableColumnRepository.save(column);
  }

  async update(updateTableInput: UpdateTableColumnInput, user: User) {
    const { uid, name } = updateTableInput;

    const columnToUpdate = await this.tableColumnRepository.findOneOrFail({
      where: {
        uid,
      },
      relations: ['table', 'table.user'],
    });

    if (columnToUpdate.table.user.uid !== user.uid) {
      throw new ForbiddenException();
    }
    columnToUpdate.name = name;

    return this.tableColumnRepository.save(columnToUpdate);
  }

  async delete(uid: string, user: User) {
    const columnToDelete = await this.tableColumnRepository.findOneOrFail({
      where: {
        uid,
      },
      relations: ['table', 'table.user'],
    });

    if (columnToDelete.table.user.uid !== user.uid) {
      throw new ForbiddenException();
    }

    await this.tableColumnRepository.delete(columnToDelete);

    return 'Success';
  }
}
