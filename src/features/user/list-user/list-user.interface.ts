
export interface User{
    username: string
    email: string;
    uuid: string
}

export interface ListUserResponse {
    data: User[];
    total: number;
    current_page: number;
    per_page: number;
  }


export interface UsersResponseCommand{
 page?:number,
 limit?:number,
 uuid:string
}