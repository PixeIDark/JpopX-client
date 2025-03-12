"use client";

import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { useTheme } from "@/app/_providers/ThemeProvider";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
