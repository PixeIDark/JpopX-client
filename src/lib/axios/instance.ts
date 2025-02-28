import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { authApi } from "@/api/auth";
import { getIsomorphicSession } from "@/utils/getIsomorphicSession";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    try {
      const session = await getIsomorphicSession();

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

const MAX_RETRIES = 3;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest._retry >= MAX_RETRIES) {
      await signOut({ redirect: true, callbackUrl: "/login" });
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      originalRequest._retry ??= 1;
      originalRequest._retry++;

      try {
        const session = await getIsomorphicSession();

        if (!session?.user?.refreshToken) {
          await signOut({ redirect: true, callbackUrl: "/login" });
          return Promise.reject(error);
        }

        const refreshToken = session.user.refreshToken;
        const data = await authApi.refresh(refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        await signIn("Refresh", {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          redirect: false,
        });

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(`${originalRequest._retry}th Failed:`, refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
