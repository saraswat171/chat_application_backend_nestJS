import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
import { UserSignInService } from './auth-user.service';
import { UserSignInDto } from './auth-user.dto';

  
  @Controller('insta')
  export class UserSignInController {
    constructor(
      private readonly handler: UserSignInService,
    ) {}
  
    @Post('/auth-user')
    public async handle(
      @Body() body: UserSignInDto,
      @Res() res: Response,
    ) {
      const response =await this.handler.handle(body);
      return res.status(HttpStatus.OK).json(response);
    }
  }