import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Response } from 'express';
import { RegisterChatDto } from './register-chat.dto';
import { RegisterChatService } from './register-chat.service';
import { AuthGuard } from 'src/features/user/auth-gaurd/authgaurd';

  
  @Controller('insta')
  export class RegisterChatController {
    constructor(
      private readonly handler: RegisterChatService,
    ) {}
    @UseGuards(AuthGuard)
    @Post('/chat')
    public async handle(
      @Req() request: Request,
      @Body() body: RegisterChatDto,
      @Res() res: Response,
    ) {
      const userData = request['user']
      body.participants.push(userData.sub) 
     const response= await this.handler.handle(body);
      return res
        .status(HttpStatus.OK)
        .json(response);
    }
  }