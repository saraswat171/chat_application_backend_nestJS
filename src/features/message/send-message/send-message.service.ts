import { Injectable } from '@nestjs/common';
import { ChatNotFound } from 'src/domain/chat/exception/exception';
import { PusherService } from 'src/features/pusher/pusher.servcie';
import { ChatRepository } from 'src/infrastructure/repositories/chat/chat.repository';
import { MessageRepository } from 'src/infrastructure/repositories/message/message.repository';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Injectable()
export class SendMessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly repository: ChatRepository,
    private readonly userRepository: UserRepository,
    private readonly pusherService: PusherService
  ) {}

  public async handle(payload) {
    const chat = await this.repository.findChatByUUID(payload.chat);
    if(!chat){
      throw new ChatNotFound();
    }
    payload.sender = await this.userRepository.findUserByUUID(payload.sender);
    payload.chat=chat;
    
    const sendMessage = await this.messageRepository.saveMessage(payload)
    const channelName = `${channels.REAL_TIME_CHAT_CHANNEL}`;
    const eventName = `${events.REAL_TIME_MESSAGE_SENT_EVENT}-${chat?.uuid}`;
    const action = pusherAction.MESSAGE_SENT
    await this.pusherService.trigger(channelName, eventName, { sendMessage,action });
    return sendMessage;
  }

}