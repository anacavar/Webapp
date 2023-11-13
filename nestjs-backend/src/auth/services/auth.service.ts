import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UsersRepository } from '../../users/repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../common/strategies/jwt-payload.interface';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string }> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    response: Response,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      response.cookie('jwt-accessToken', accessToken, { httpOnly: true });
      // return { message: 'User logged in successfully' };
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  // async signIn(
  //   authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const { username, password } = authCredentialsDto;
  //   const user = await this.usersRepository.findOne({
  //     where: { username: username },
  //   });
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload: JwtPayload = { username };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('Please check your login credentials');
  //   }
  // }

  async getUser(request: Request): // authCredentialsDto: AuthCredentialsDto,
  Promise<any> {
    try {
      const cookie = request.cookies['jwt-accessToken'];
      const data = await this.jwtService.verifyAsync(cookie);
      const user = await this.usersRepository.findOne({
        where: { id: data['id'] },
      });
      const { password, ...result } = user;
      return result; // zašto ovo vrati usera anna1?
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // refreshToken() {} // čemu ovo točno?

  async logout(
    // authCredentialsDto: AuthCredentialsDto,
    response: Response,
  ): // authCredentialsDto: AuthCredentialsDto,
  // response: Response,
  Promise<{ message: string }> {
    response.clearCookie('jwt-accessToken');
    //clear the cookie
    // try {
    //   response.clearCookie('jwt-accessToken');
    //   return { message: 'user successfully logged out' };
    // } catch {
    //   console.log('ne mre');
    //   return { message: 'neki error - koji?' };
    // }
    return { message: 'cookie cleared??' };
  }
}
