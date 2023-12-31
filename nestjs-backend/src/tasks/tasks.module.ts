import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TasksRepository } from './repositories/tasks.repository';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([TasksRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
