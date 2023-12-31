import { Module } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { UsersController } from '../users/controllers/users.controller';
import { UsersRepository } from '../users/repositories/users.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
