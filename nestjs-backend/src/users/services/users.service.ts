import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';

@Injectable() // što ovo znači?
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }
}
