import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTableInput {
  @Field()
  name: string;
}
