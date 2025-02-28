import { axiosInstance } from "@/lib/axios/instance";
import {
  AccountRequest,
  AccountResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshRequest,
} from "@/types/auth.type";

const url = "auth";

export const authApi = {
  account: (data: AccountRequest) => axiosInstance.post<AccountResponse>(`${url}/signup`, data),
  login: (data: LoginRequest) => axiosInstance.post<LoginResponse>(`${url}/login`, data),
  logout: (refreshToken: RefreshRequest) =>
    axiosInstance.post<LogoutResponse>(`${url}/logout`, { refreshToken }),
  refresh: async (refreshToken: RefreshRequest) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  },
};
