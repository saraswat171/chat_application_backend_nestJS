
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exception/exception';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Injectable()
export class RegisterUserService {
  constructor(private repository: UserRepository) {}

  public async handle(payload) {
    const user = await this.repository.findUserByEmail(payload.email);
    if (user) {
      throw new UserEmailAlreadyExistsConflict()
    }
    payload.password= await bcrypt.hash(payload.password , 10)
    return this.repository.saveUser(payload);
  }

}