import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const newUser = this.create({
        ...authCredentialsDto,
        password: hashedPassword,
      });

      await this.save(newUser);
      return 'User successfully created';
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
