import axios from "axios";
import { getIsomorphicSession } from "@/utils/getIsomorphicSession";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
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

if (typeof window !== "undefined") {
  const MAX_RETRIES = 3;

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (originalRequest._retry >= MAX_RETRIES) {
        const response = await fetch("/api/auth/signOut", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.redirect) {
          window.location.href = data.redirect;
          return new Promise(() => {});
        }
        return Promise.reject(error);
      }

      if (error.response && error.response.status === 401) {
        originalRequest._retry ??= 1;
        originalRequest._retry++;

        try {
          const session = await getIsomorphicSession();

          if (!session?.user?.refreshToken) {
            const response = await fetch("/api/auth/signOut", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();

            if (data.redirect) {
              window.location.href = data.redirect;
              return new Promise(() => {});
            }
            return Promise.reject(error);
          }

          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: session.user.refreshToken }),
          });

          const data = await response.json();

          await fetch("/api/auth/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              },
            }),
          });

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error(`Failed Intercepting (${originalRequest._retry}th):`, refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}
