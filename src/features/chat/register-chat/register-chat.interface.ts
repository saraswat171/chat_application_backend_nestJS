import { UserRegisterInterface } from "src/features/user/register-user/register-user.interface";

export interface ChatRegisterInterface {
    isGroupChat?: boolean,
    groupName?: string,
    participants:UserRegisterInterface[],
  }