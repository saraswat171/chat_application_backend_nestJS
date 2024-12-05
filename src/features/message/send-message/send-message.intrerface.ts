
import { ChatRegisterInterface } from "src/features/chat/register-chat/register-chat.interface";
import { UserRegisterInterface } from "src/features/user/register-user/register-user.interface";

export interface SendMessageInterface {
   content:string;
   sender:UserRegisterInterface;
   chat:ChatRegisterInterface
  }