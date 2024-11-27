import { Module } from '@nestjs/common';
import { ListUsersController } from './list-user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ListUsersHandler } from './list-user.service';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [JwtModule],

  controllers: [ListUsersController],
  providers: [UserRepository, ListUsersHandler],
})
export class ListUserModule {}