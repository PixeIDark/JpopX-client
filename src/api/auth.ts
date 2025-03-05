import { axiosInstance } from "@/lib/axios/instance";
import {
  AccountRequest,
  AccountResponse,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from "@/types/auth.type";

const url = "auth";

export const authApi = {
  account: (data: AccountRequest) => axiosInstance.post<AccountResponse>(`${url}/signup`, data),
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>(`${url}/login`, data);
    return response.data;
  },
  logout: async (accessToken: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  refresh: async (refreshToken: RefreshRequest): Promise<RefreshResponse> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      return response.json();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
};
