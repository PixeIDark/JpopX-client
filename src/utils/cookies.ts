"use server";

import { cookies } from "next/headers";
import { CookieOption } from "next-auth";

export const getCookie = async <T = string>(name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value as T | undefined;
};

export const setCookie = async (
  name: string,
  value: string,
  options: CookieOption | undefined = undefined
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { ...options });
};
