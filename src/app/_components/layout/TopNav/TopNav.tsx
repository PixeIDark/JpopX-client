"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/common/ThemeToggle";

const NAV_TITLE = {
  "/": "Home",
  "/login": "Login",
  "/account": "Account",
  "/search": "Search",
} as const;

type NavPath = keyof typeof NAV_TITLE;

function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const title = pathname in NAV_TITLE ? NAV_TITLE[pathname as NavPath] : "Unknown Page";

  return (
    <div className="pt sticky top-0 -mx-4 flex items-center justify-between border-b border-solid-default bg-body-default px-4 pb-3 pt-5">
      <button onClick={() => router.back()} className="p-2">
        <ArrowLeft size={24} strokeWidth={1.5} />
      </button>
      <Link href="/">
        <h1 className="text-lg font-semibold text-text-h">{title}</h1>
      </Link>
      <ThemeToggle />
    </div>
  );
}

export default TopNav;
