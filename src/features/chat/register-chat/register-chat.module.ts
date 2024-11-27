import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { RegisterChatController } from './register-chat.controller';
import { RegisterChatService } from './register-chat.service';
import { ChatRepository } from 'src/infrastructure/repositories/chat/chat.repository';



@Module({
  imports: [],
  controllers: [RegisterChatController],
  providers: [ChatRepository,UserRepository, RegisterChatService],
})
export class RegisterChatModule {}