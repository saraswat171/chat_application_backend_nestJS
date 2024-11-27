import { Module } from '@nestjs/common';
import { SendMessageController } from './send-message.controller';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ChatRepository } from 'src/infrastructure/repositories/chat/chat.repository';
import { MessageRepository } from 'src/infrastructure/repositories/message/message.repository';
import { SendMessageService } from './send-message.service';



@Module({
  imports: [],
  controllers: [SendMessageController],
  providers: [ChatRepository,UserRepository,MessageRepository, SendMessageService],
})
export class SendMessageModule {}