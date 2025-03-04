import NextAuth from "next-auth";
import { config } from "@/lib/next-auth/nextAuthConfig";

export const { auth, handlers, signIn, signOut, unstable_update: update } = NextAuth(config);
