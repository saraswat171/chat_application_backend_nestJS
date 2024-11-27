import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
import { RegisterChatDto } from './register-chat.dto';
import { RegisterChatService } from './register-chat.service';

  
  @Controller('insta')
  export class RegisterChatController {
    constructor(
      private readonly handler: RegisterChatService,
    ) {}
  
    @Post('/chat')
    public async handle(
      @Body() body: RegisterChatDto,
      @Res() res: Response,
    ) {
     const response= await this.handler.handle(body);
      return res
        .status(HttpStatus.OK)
        .json(response);
    }
  }