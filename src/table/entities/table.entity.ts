import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../auth/user.entity';
import { TableColumn } from '../../table-column/entities/table-column.entity';

@ObjectType()
@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  uid: string;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => TableColumn, (columns) => columns.table)
  @Field(() => [TableColumn])
  columns: TableColumn[];

  @ManyToOne(() => User, (user) => user.tables)
  @Field(() => User)
  user: User;
}
