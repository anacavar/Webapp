import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../common/strategies/jwt-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    response: Response,
  ): Promise<{ message: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      response.cookie('jwt-accessToken', accessToken, { httpOnly: true });
      return { message: 'success' };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  // refreshToken() {}

  // logOut() {}
}
