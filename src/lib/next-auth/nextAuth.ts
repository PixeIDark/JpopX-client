import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@/api/auth";

export const authOptions: NextAuthOptions = {
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

          const response = await authApi.login(credentials);

          const { user, accessToken, refreshToken } = response;

          if (user && accessToken) {
            return {
              accessToken,
              refreshToken,
              id: user.id,
              email: user.email,
              name: user.name,
              profile_image_url: user.profile_image_url,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "Refresh",
      name: "Refresh",
      credentials: {
        refreshToken: { label: "RefreshToken", type: "refresh_token" },
        accessToken: { label: "AccessToken", type: "access_token" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.accessToken || !credentials?.refreshToken) return null;

          const { accessToken, refreshToken } = credentials;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const data = await response.json();

          return {
            accessToken,
            refreshToken,
            id: data.id,
            email: data.email,
            name: data.name,
            profile_image_url: data.profile_image_url,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  events: {
    async signOut({ token }) {
      if (token?.accessToken) await authApi.logout(token.accessToken);
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = Number(user.id);
        token.name = user.name;
        token.email = user.email;
        token.profile_image_url = user.profile_image_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  // pages: {
  //   signIn: "/login",
  //   error: "/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
};
