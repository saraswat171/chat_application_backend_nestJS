import { ChatRegisterInterface } from "src/features/Chat/register-Chat/register-Chat.interface";
import { UserRegisterInterface } from "src/features/user/register-user/register-user.interface";

export interface SendMessageInterface {
   content:string;
   sender:UserRegisterInterface;
   chat:ChatRegisterInterface
  }