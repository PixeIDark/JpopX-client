"use client";

import React, { createContext, useContext, useState } from "react";
import { setTheme as setThemeUtil, Theme } from "@/utils/theme";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps extends React.PropsWithChildren {
  initialTheme: Theme;
}

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    setThemeUtil(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
