import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ListUserResponse, UsersResponseCommand } from './list-user.interface';
import { ListUsersDto } from './list-user.dto';

@Injectable()
export class ListUsersHandler {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  public async handle(data:UsersResponseCommand): Promise<ListUserResponse> {
    return await this.repository.listUsers(data);
  }
}
