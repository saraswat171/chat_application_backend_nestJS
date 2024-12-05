import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserSignInDto } from './auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; 
import { UserSignInResponse } from './auth-user.interface';

@Injectable()
export class UserSignInService {
  constructor(
    private repository: UserRepository,
    private jwtService: JwtService
  ) {}

  public async handle(query:UserSignInDto): Promise<UserSignInResponse> {

 const user = await this.repository.findUserByEmail(query.email);


 const isPasswordValid = await bcrypt.compare(query.password, user?.password);

    if (!isPasswordValid) {
    throw new UnauthorizedException();
  }
  const payload = { sub: user.uuid,email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      email:user.email,
      username:user.username
    };

  }

}