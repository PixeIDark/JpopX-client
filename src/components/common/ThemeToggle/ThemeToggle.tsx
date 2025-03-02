"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { setTheme } from "@/utils/theme";

type Props = {
  currentTheme: "light" | "dark";
};

function ThemeToggle({ currentTheme }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleTheme = async () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";

    await setTheme(newTheme);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isPending}
      className="relative h-10 max-h-10 w-10 rounded-md p-2 hover:bg-button-ghost"
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      {currentTheme === "light" ? (
        <MdOutlineNightlightRound size={24} className="text-text-h" />
      ) : (
        <MdLightMode size={24} className="text-text-h" />
      )}
    </button>
  );
}

export default ThemeToggle;
