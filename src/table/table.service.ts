import { Injectable, ForbiddenException } from '@nestjs/common';

import { User } from '../auth/user.entity';
import { TableRepository } from './table.repository';
import { CreateTableInput } from './dto/create-table.input';
import { UpdateTableInput } from './dto/update-table.input';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  async create(createTableInput: CreateTableInput, user: User) {
    const { name } = createTableInput;
    const newTable = this.tableRepository.create({
      name,
      user,
      columns: [
        {
          name: 'To-do',
        },
        {
          name: 'In Progress',
        },
        {
          name: 'Done',
        },
      ],
    });

    return this.tableRepository.save(newTable);
  }

  async update(updateTableInput: UpdateTableInput, user: User) {
    const { uid, name } = updateTableInput;

    const tableToUpdate = await this.tableRepository.findOneOrFail({
      where: {
        uid,
      },
      relations: ['user'],
    });

    if (tableToUpdate.user.uid !== user.uid) {
      throw new ForbiddenException();
    }
    tableToUpdate.name = name;

    return this.tableRepository.save(tableToUpdate);
  }

  async delete(uid: string, user: User) {
    const tableToDelete = await this.tableRepository.findOneOrFail({
      where: {
        uid,
      },
      relations: ['user'],
    });

    if (tableToDelete.user.uid !== user.uid) {
      throw new ForbiddenException();
    }

    await this.tableRepository.delete(tableToDelete);

    return 'Success';
  }
}
