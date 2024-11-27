import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
import { SendMessageDto } from './send-message.dto';
import { SendMessageService } from './send-message.service';


  
  @Controller('insta')
  export class SendMessageController {
    constructor(
      private readonly handler: SendMessageService,
    ) {}
  
    @Post('/message')
    public async handle(
      @Body() body: SendMessageDto,
      @Res() res: Response,
    ) {
     const response= await this.handler.handle(body);
      return res
        .status(HttpStatus.OK)
        .json(response);
    }
  }