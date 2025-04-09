"use client";

import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { Theme, useTheme } from "@/app/_layout/TopNav/ThemeToggle/_hooks/useTheme";

function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
  const { theme, toggleTheme } = useTheme(initialTheme);

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 max-h-10 w-10 rounded-md p-2 hover:bg-button-ghost"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MdOutlineNightlightRound size={24} className="text-text-h" />
      ) : (
        <MdLightMode size={24} className="text-text-h" />
      )}
    </button>
  );
}

export default ThemeToggle;
