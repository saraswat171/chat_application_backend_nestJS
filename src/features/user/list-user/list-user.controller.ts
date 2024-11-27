import {
  Body,
    Controller,
    Get,
    HttpStatus,
    Query,
    Req,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Response } from 'express';
import { ListUsersHandler } from './list-user.service';
import { ListUsersDto } from './list-user.dto';
import { AuthGuard } from '../auth-gaurd/authgaurd';
  
  @Controller('/insta')
  export class ListUsersController {
    constructor(
      private readonly handler: ListUsersHandler,
    ) {}
  
    @UseGuards(AuthGuard)
    @Get('/users')
    public async handle(@Req() request: Request,
    @Res() res: Response,@Query() query: ListUsersDto
  ) {
      console.log('request: ', request['user']);
      const response = await this.handler.handle(query);
      return res.status(HttpStatus.OK).json(response);
    }
  }
  