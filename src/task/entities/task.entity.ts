import { ObjectType, Field } from '@nestjs/graphql';
import { TableColumn } from 'src/table-column/entities/table-column.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  uid: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => TableColumn, (tableColumn) => tableColumn.tasks)
  @Field(() => TableColumn)
  column: TableColumn;
}
