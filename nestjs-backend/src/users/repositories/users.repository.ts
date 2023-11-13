import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { CustomRepository } from '../../database/typeorm-ex.decorator';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string }> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('salt', salt);
    console.log('hashedPassword', hashedPassword);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
      return { message: 'User signed up successfully' };
    } catch (error) {
      if (error.code === '23505') {
        // error is duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    const users = await query.getMany();
    return users;
  }

  // async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
  //   const { status, search } = filterDto;
  //   const query = this.createQueryBuilder('task');
  //   query.where({ user });

  //   if (status) {
  //     query.andWhere('task.status=:status', { status: 'OPEN' });
  //   }
  //   if (search) {
  //     query.andWhere(
  //       '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
  //       { search: `%${search}%` },
  //     );
  //   }

  //   try {
  //     const tasks = await query.getMany();
  //     return tasks;
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to get tasks for user "${
  //         user.username
  //       }". Filters: ${JSON.stringify(filterDto)}`,
  //     );
  //     throw new InternalServerErrorException();
  //   }
  // }
}
