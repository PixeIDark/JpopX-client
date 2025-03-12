export type Theme = "light" | "dark";

export const setTheme = (theme: Theme) => localStorage.setItem("theme", theme);

export const getTheme = () => localStorage.getItem("theme") as Theme | undefined;
