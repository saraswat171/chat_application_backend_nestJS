import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { UserModule } from './features/user/user.module';
import { RegisterChatModule } from './features/chat/register-chat/register-chat.module';
import { SendMessageModule } from './features/message/send-message/send-message.module';
import { PusherModule } from './features/pusher/pusher.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    UserModule,
    RegisterChatModule,
    SendMessageModule,
    PusherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
