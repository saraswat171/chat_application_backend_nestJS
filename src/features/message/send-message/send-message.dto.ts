import {  IsBoolean,  IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class SendMessageDto {
  
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsUUID()
    @IsNotEmpty()
    sender: string;

    @IsUUID()
    @IsNotEmpty()
    chat: string;

  }