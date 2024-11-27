import { Module } from '@nestjs/common';
import { RegisterUserModule } from './register-user/register-user.module';
import { ListUserModule } from './list-user/list-user.module';
import { AuthUserModule } from './auth-user/auth-user.module';


@Module({
  imports: [
    RegisterUserModule,
    ListUserModule,
    AuthUserModule
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}