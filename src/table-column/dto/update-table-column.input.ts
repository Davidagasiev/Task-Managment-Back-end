import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTableColumnInput {
  @Field()
  uid: string;

  @Field()
  name: string;
}
