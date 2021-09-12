import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskStatusInput {
  @Field()
  uid: string;

  @Field()
  columnUid: string;
}
