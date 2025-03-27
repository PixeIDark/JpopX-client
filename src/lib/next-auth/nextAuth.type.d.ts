import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      id: number;
      name: string;
      email: string;
      profile_image_url: string | null;
    } & DefaultSession["user"];
    refreshTokenExpires: number;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    id: number;
    name: string;
    email: string;
    profile_image_url: string | null;
    refreshTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: number;
    name: string;
    email: string;
    profile_image_url: string | null;
    refreshTokenExpires: number;
  }
}
