export interface User {
  id: number;
  userName: string;
  token: string;
  fullName: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}
