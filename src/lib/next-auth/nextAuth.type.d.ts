// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { StaticImageData } from "next/image";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      id: string;
      name: string;
      email: string;
      profile_image_url: StaticImageData | null;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    id: string;
    name: string;
    email: string;
    profile_image_url: StaticImageData | null;
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    name: string;
    email: string;
    profile_image_url: StaticImageData | null;
  }
}
