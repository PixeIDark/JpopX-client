interface User {
  id: number;
  name: string;
  email: string;
}

export interface AccountRequest {
  name: string;
  email: string;
  password: string;
}

export type AccountResponse = string;

export type LoginRequest = Omit<AccountRequest, "name">;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type LogoutResponse = string;

export type RefreshRequest = string;

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
