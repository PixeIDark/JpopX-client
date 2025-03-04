import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { auth } from "@/auth";

export const getIsomorphicSession = async (): Promise<Session | null> => {
  return typeof window === "undefined" ? await auth() : await getSession();
};
