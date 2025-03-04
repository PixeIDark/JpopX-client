import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@/api/auth";
import type { NextAuthConfig } from "next-auth";
import { LoginRequest } from "@/types/auth.type";

export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const loginData: LoginRequest = {
            email: credentials.email as string,
            password: credentials.password as string,
          };

          const response = await authApi.login(loginData);

          const { user, accessToken, refreshToken } = response;

          if (user && accessToken) {
            return {
              accessToken,
              refreshToken,
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              profile_image_url: user.profile_image_url,
              emailVerified: null,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id || "";
        token.name = user.name || "";
        token.email = user.email || "";
        token.profile_image_url = user.profile_image_url;
      }
      if (trigger === "update" && session) {
        Object.assign(token, session.user);
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.profile_image_url = token.profile_image_url;
      }
      return session;
    },
  },
  events: {
    async signOut(message) {
      const token = "token" in message ? message.token : null;

      if (token?.accessToken) {
        await authApi.logout(token.accessToken);
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  // pages: {
  //   signOut: "/login", // 얘 왜 작동안하는지 도저히 모르겠어
  // },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
