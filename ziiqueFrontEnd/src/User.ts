export interface User{
  email: string;
  username_Email: string;
}

export interface UserDTO {
  email: string;
  username: string;
  password: string;
}

export interface LoginDTO {
  username_Email: string;
  password: string;
}
