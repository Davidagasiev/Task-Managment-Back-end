import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn({
    email,
    password,
  }: AuthCredentialsDto): Promise<JwtPayloadDto> {
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        uid: user.uid,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
