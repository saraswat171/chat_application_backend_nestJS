
import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/infrastructure/repositories/chat/chat.repository';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Injectable()
export class RegisterChatService {
  constructor(
    private readonly repository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(payload) {
    console.log('payload: ', payload);
    const chat = await this.repository.findChatByParticipantId(payload.participants);
     console.log('chat: ', chat);
    if(chat){
      const chatData = await this.repository.findChats(chat?.uuid)
      // console.log('chatData: ', chatData);
      return chatData;
    }
    payload.participants = await this.userRepository.findUserByUUIDs(payload.participants);
    const createChat = await this.repository.createChat(payload)
    return createChat;
  }

}