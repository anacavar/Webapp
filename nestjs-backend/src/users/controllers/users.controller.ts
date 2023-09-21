import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
// import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtAuthGuard)
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private usersService: UsersService) {}

  @Get('/get') // 404 not found
  getUsers(): Promise<{ message: string }> {
    return this.usersService.getUsers();
  }
}
