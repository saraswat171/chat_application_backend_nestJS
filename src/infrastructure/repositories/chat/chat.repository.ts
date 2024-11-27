import { Injectable } from '@nestjs/common';
import { Chat } from 'src/domain/chat/chat.entity';
import { ChatRegisterInterface } from 'src/features/Chat/register-Chat/register-Chat.interface';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class ChatRepository extends Repository<Chat> {
  constructor(dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }

  async createChat(payload: ChatRegisterInterface): Promise<Chat> {
    return await this.save(payload);
  }

  async findChatByParticipantId(participants: string[]): Promise<Chat> {
    return await this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.participants', 'user')  // Join with the participants relation
      .where('user.uuid IN (:...participants)', { participants }) // Match participant IDs
      .getOne(); // Fetch multiple results
  }

  async findChats(uuid: string){
    return await this.createQueryBuilder('chat')
    .leftJoinAndSelect('chat.messages', 'message')  
    .leftJoinAndSelect('message.sender' , 'sender')
    .addSelect(['sender.uuid', 'sender.username', 'sender.email']) 
    .where('chat.uuid = :uuid', { uuid }) 
    .getOne();
  }

  
  async findChatByUUID(uuid:string): Promise<Chat> {
    return await this.findOne({ where: { uuid } });
  }

//   async listChats(payload: ListChatsDto) {
//     const { page = 1, limit = 10 } = payload;

//     const offset = limit * (page - 1);

//     let queryBuilder = this.createQueryBuilder();

//     const [data, total] = await queryBuilder
//       .offset(offset)
//       .limit(limit)
//       // .orderBy('created_at', 'DESC')
//       .getManyAndCount();

//     return { data, total, current_page: page, per_page: limit };
//   }
}