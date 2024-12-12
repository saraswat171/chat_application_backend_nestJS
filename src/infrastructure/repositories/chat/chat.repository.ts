import { Injectable } from '@nestjs/common';
import { Chat } from 'src/domain/chat/chat.entity';
import { ChatRegisterInterface } from 'src/features/chat/register-chat/register-chat.interface';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class ChatRepository extends Repository<Chat> {
  constructor(dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }

  async createChat(payload: ChatRegisterInterface): Promise<Chat> {
    return await this.save(payload);
  }

  // async findChatByParticipantId(participants: string[]): Promise<Chat> {
  //   return await this.createQueryBuilder('chat')
  //     .leftJoinAndSelect('chat.participants', 'user') 
  //     .where('user.uuid IN (:...participants)', { participants }) 
  //     .getOne(); 
  // }


   async findChatByParticipantId(participants: string[]): Promise<any> {
  //   const participantCount = participants.length;
  
  return this.createQueryBuilder('chat')
  .innerJoin('chat.participants', 'participant')
  .where('participant.uuid IN (:...participants)', { participants })
  .groupBy('chat.uuid')
  .having('COUNT(participant.uuid) = :count', { count: participants.length })
  .getOne();
   }
  
  // async findChats(uuid: string){
  //   return await this.createQueryBuilder('chat')
  //   .leftJoinAndSelect('chat.messages', 'message')  
  //   .leftJoin('message.sender', 'sender')  
  //   .addSelect(['sender.uuid', 'sender.username', 'sender.email']) 
  //   .where('chat.uuid = :uuid', { uuid }) 
  //   .getOne();
  // }

  async findChats(uuid: string) {
    return await this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.messages', 'message') 
      .orderBy('message.createdAt', 'DESC') 
      .limit(5) 
      .leftJoin('message.sender', 'sender') 
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