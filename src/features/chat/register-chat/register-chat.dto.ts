import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class Participants {

  @IsUUID()
  @IsNotEmpty()
  uuid: string

}

export class RegisterChatDto {

    @IsBoolean()
    @IsOptional()
    isGroupChat: boolean;
  
    @IsEmail()
    @IsOptional()
    groupName: string;

    @IsArray()
    @IsNotEmpty()
    participants: Participants[]

  }