"use server";

import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export async function setTheme(theme: Theme) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "theme",
    value: theme,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value as Theme;
  return theme === "dark" ? "dark" : "light";
}
