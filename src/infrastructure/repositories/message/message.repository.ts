import { Injectable } from '@nestjs/common';
import { Message } from 'src/domain/message/message.entity';
import { SendMessageInterface } from 'src/features/message/send-message/send-message.intrerface';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async saveMessage(payload: SendMessageInterface): Promise<Message> {
    return await this.save(payload);
  }


//   async listUsers(payload: ListUsersDto) {
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