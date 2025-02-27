"use client";

import { useTheme } from "@/components/common/ThemeToggle/_hooks/useTheme";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { useMounted } from "@/hooks/useMounted";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { mounted } = useMounted();

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 max-h-10 w-10 rounded-md p-2 hover:bg-button-ghost"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" && <MdOutlineNightlightRound size={24} color="black" />}
      {(theme !== "light" || !mounted) && (
        <MdLightMode
          size={24}
          color="white"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </button>
  );
}

export default ThemeToggle;
