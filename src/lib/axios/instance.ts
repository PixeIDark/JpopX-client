import axios from "axios";
import { getIsomorphicSession } from "@/utils/getIsomorphicSession";
import { RefreshResponse } from "@/types/auth.type";
import { NextResponse } from "next/server";

// 서버, 클라 모든 환경 인터셉팅 가능
// 인터셉팅이 연속으로 될경우 (1000ms)내로 가능 지점: 서버 => 서버 X, 서버 => 클라 O, 클라 => 서버 O, 클라 => 클라 O
// 서버 인터셉팅은 서버로그에 안보임, 근데 신기한게 아주 작은 문제 하나라도 생기면 바로 모든 서버로그를 확인 가능.
// 다음부터는 nextAuth 쓰지말자.. app router & react query 와의 호환이 구데기다
const isServer = typeof window === "undefined";
console.log("isServer:", isServer); // 오로지 이 친구로만 서버 인터셉팅의 흔적 확인 가능

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 수명 0.001초 짜리인데 사실 없는거나 다름없는 함수들임
// 근데 서버 로직이 잘돌아감. 또, 이 함수들 안쓰면 서버 인터셉팅 오류생김(세션업데이트가 안됨) 이해가 안돼 ㅋㅋㅋ
const TOKEN_CACHE_DURATION = 1;

// 서버환경에는 로컬스토리지가 없다.. 그러면 어떻게 이코드가 동작하는걸까?
function cacheTokens(tokens: RefreshResponse) {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
  const tokenExpiry = Date.now() + TOKEN_CACHE_DURATION;
  localStorage.setItem("tokenExpiry", tokenExpiry.toString());
}

function getValidTokenCache() {
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  let cacheToken = null;
  if (Date.now() < Number(tokenExpiry)) {
    cacheToken = {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  }
  const res = NextResponse.next();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
  return cacheToken;
}

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

const MAX_RETRIES = 1;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest._retry >= MAX_RETRIES) {
      const response = await fetch("http://localhost:3000/api/auth/signOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      }
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      originalRequest._retry ??= 0;
      originalRequest._retry++;
      const cachedTokens = getValidTokenCache();

      if (cachedTokens && !isServer) {
        await fetch("http://localhost:3000/api/auth/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              accessToken: cachedTokens.accessToken,
              refreshToken: cachedTokens.refreshToken,
            },
          }),
        });
      }

      try {
        const session = await getIsomorphicSession();

        if (!session?.user?.refreshToken) {
          const response = await fetch(`http://localhost:3000/api/auth/signOut`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.redirect) {
            window.location.href = data.redirect;
          }
          return Promise.reject(error);
        }

        const response = await fetch(`http://localhost:3000/api/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: session.user.refreshToken }),
        });

        if (!response.ok) {
          throw new Error("Token refresh failed");
        }

        const data = await response.json();
        if (isServer) cacheTokens(data);

        await fetch("http://localhost:3000/api/auth/update", {
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
        console.error(`Failed Intercepting (${originalRequest._retry}th),`, refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
