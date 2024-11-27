import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
import { UserRegisterDto } from './register-user.dto';
import { RegisterUserService } from './register-user.service';
  
  @Controller('insta')
  export class RegisterUserController {
    constructor(
      private readonly handler: RegisterUserService,
    ) {}
  
    @Post('/user')
    public async handle(
      @Body() body: UserRegisterDto,
      @Res() res: Response,
    ) {
      await this.handler.handle(body);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'User Created successfully' });
    }
  }