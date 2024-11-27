import { Module } from '@nestjs/common';
import { RegisterUserController } from './register-user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { RegisterUserService } from './register-user.service';


@Module({
  imports: [],
  controllers: [RegisterUserController],
  providers: [UserRepository, RegisterUserService],
})
export class RegisterUserModule {}