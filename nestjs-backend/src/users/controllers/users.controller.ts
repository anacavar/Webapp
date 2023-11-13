import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private usersService: UsersService) {}

  @Get('/getUsers')
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
