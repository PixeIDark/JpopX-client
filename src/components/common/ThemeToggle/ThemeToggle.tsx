"use client";

import { useTheme } from "@/components/common/ThemeToggle/_hooks/useTheme";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 hover:bg-button-ghost"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MdOutlineNightlightRound size={24} color="black" />
      ) : (
        <MdLightMode size={24} color="white" />
      )}
    </button>
  );
}

export default ThemeToggle;
