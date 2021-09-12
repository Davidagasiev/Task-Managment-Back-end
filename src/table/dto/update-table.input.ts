import { CreateTableInput } from './create-table.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTableInput extends PartialType(CreateTableInput) {
  @Field()
  uid: string;

  @Field()
  name: string;
}
