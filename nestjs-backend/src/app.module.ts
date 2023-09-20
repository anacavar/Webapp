import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './database/entities/task.entity';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { TasksRepository } from './tasks/repositories/tasks.repository';
import { AuthModule } from './auth/auth.module';
import { User } from './database/entities/user.entity';
import { UsersRepository } from './users/repositories/users.repository';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Task, User],
    }),
    TypeOrmExModule.forCustomRepository([TasksRepository, UsersRepository]),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
