
export interface User{
    username: string
    email: string;
    password: string
}

export interface ListUserResponse {
    data: User[];
    total: number;
    current_page: number;
    per_page: number;
  }