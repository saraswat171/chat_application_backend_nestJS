import { Module } from '@nestjs/common';
import { UserSignInController } from './auth-user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserSignInService } from './auth-user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        global:true,
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '6000s' }, 
      }),
    }),
  ],
  controllers: [UserSignInController],
  providers: [UserRepository, UserSignInService],
})
export class AuthUserModule {}