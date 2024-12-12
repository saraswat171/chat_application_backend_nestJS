import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { ListUsersDto } from 'src/features/user/list-user/list-user.dto';
import { UsersResponseCommand } from 'src/features/user/list-user/list-user.interface';
import { UserRegisterInterface } from 'src/features/user/register-user/register-user.interface';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveUser(payload: UserRegisterInterface): Promise<User> {
    return await this.save(payload);
  }

  async findUserByEmail(email:string): Promise<User> {
    return await this.findOne({ where: { email } });
  }

  async findUserByUUIDs(participants: string[]){
    return await this.createQueryBuilder('user') 
    .where('user.uuid IN (:...participants)', { participants }) 
    .getMany();
  }

  async findUserByUUID(uuid: string) {
    return await this.findOne({
      where: { uuid },
      select: ['uuid', 'username', 'email'] 
    });
  }
  

  async listUsers(payload: UsersResponseCommand) {
    const { page = 1, limit = 10 ,uuid} = payload;

    const offset = limit * (page - 1);

    let queryBuilder = this.createQueryBuilder('user')
    .select([
      'user.uuid',
      'user.username',
      'user.email',
    ])
    .where('user.uuid != :uuid', { uuid }) 
    .offset(offset)
    .limit(limit);
  
  const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total, current_page: page, per_page: limit };
  }
}