"use server";

import { signIn, signOut, update } from "@/auth";
import { Session } from "next-auth";
import { LoginRequest } from "@/types/auth.type";

export const signInCredentialAction = async (
  data: LoginRequest
): Promise<Awaited<ReturnType<typeof signIn>>> => {
  return await signIn("credentials", { ...data, redirect: false });
};

export const signOutAction = async (): Promise<void> => {
  await signOut({ redirect: false });
};

export const updateSession = async (data: Partial<Session["user"]>): Promise<void> => {
  await update({ user: data });
};
