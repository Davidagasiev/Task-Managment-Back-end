import { ObjectType, Field } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Table } from '../../table/entities/table.entity';

@ObjectType()
@Entity()
export class TableColumn {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  uid: string;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => Table, (table) => table.columns)
  @Field(() => Table)
  table: Table;

  @OneToMany(() => Task, (task) => task.column)
  @Field(() => [Task])
  tasks: Task[];
}
