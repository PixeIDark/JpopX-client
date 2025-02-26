"use client";

import { useTheme } from "@/components/common/ThemeToggle/_hooks/useTheme";
import { useEffect, useState } from "react";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 마운트 된 후에만 UI 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트되기 전에는 아무것도 표시하지 않음
  if (!mounted) {
    return <div className="h-8 w-8"></div>; // 빈 공간 유지
  }

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
