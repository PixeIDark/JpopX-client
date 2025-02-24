type Theme = "light" | "dark";

export const applyTheme = (newTheme: Theme) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }
};
