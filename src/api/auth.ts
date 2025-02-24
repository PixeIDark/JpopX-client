import { axiosInstance } from "@/lib/axios/instance";
import {
  AccountRequest,
  AccountResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshRequest,
  RefreshResponse,
} from "@/types/auth.type";

const url = "auth";

export const authApi = {
  account: (data: AccountRequest) => axiosInstance.post<AccountResponse>(`${url}/signup`, data),
  login: (data: LoginRequest) => axiosInstance.post<LoginResponse>(`${url}/login`, data),
  logout: () => axiosInstance.post<LogoutResponse>(`${url}/logout`),
  refresh: (refreshToken: RefreshRequest) =>
    axiosInstance.post<RefreshResponse>(`${url}/refresh`, { refreshToken }),
};
