import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTableColumnInput {
  @Field()
  name: string;

  @Field()
  tableUid: string;
}
