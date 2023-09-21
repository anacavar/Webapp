import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../../database/entities/user.entity';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable() // make this injectable because it's a provider
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      // secretOrKey: process.env.JWT_SECRET,
      secretOrKey: 'topSecret51',
      ignoreExpiration: false, // da provjeri je li token još valjan
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      // možda simply ne nalazi usera u bazi??
      throw new UnauthorizedException();
    }
    // console.log(user);
    return user;
  }
}
