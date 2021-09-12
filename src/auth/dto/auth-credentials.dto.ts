import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthCredentialsDto {
  @Field()
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;

  @MinLength(2)
  @MaxLength(20)
  @Field({ nullable: true })
  firstName?: string;

  @MinLength(2)
  @MaxLength(20)
  @Field({ nullable: true })
  lastName?: string;
}
