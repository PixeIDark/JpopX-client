"use server";

import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export const setTheme = async (theme: Theme) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "theme",
    value: theme,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    path: "/",
  });
};

export const getTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  return (themeCookie?.value as Theme) || "light";
};
