import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field()
  uid: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
