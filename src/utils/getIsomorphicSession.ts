import { getSession } from "next-auth/react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/next-auth/nextAuth";

export const getIsomorphicSession = async (): Promise<Session | null> => {
  return typeof window === "undefined" ? await getServerSession(authOptions) : await getSession();
};
