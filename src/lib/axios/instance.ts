import axios from "axios";
import { getServerSession } from "next-auth";
import { RefreshRequest, RefreshResponse } from "@/types/auth.type";
import { signIn } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    try {
      const session = await getServerSession();

      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken: RefreshRequest) {
  try {
    const response = await axios.post<RefreshResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
}

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest._retry === 3) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      originalRequest._retry ??= 1;
      originalRequest._retry++;

      try {
        const session = await getServerSession();

        if (!session?.user?.refreshToken) {
          // 리프레시 토큰이 없으면 로그인 페이지로 리디렉션 로직 추가 가능
          return Promise.reject(error);
        }

        const refreshToken = session.user.refreshToken;
        const data = await refreshAccessToken(refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        await signIn("Refresh", {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          redirect: false,
        });

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃 처리 등 구현 가능
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
