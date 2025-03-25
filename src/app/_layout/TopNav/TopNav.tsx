"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/app/_layout/TopNav/ThemeToggle";

const NAV_TITLE = {
  "/": "Home",
  "/login": "Login",
  "/account": "Account",
  "/search": "Search",
  "/add-list": "Add List",
  "/mylist": "MyList",
  "/profile": "Profile",
} as const;

function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const title =
    NAV_TITLE[pathname as keyof typeof NAV_TITLE] ||
    NAV_TITLE[`/${pathname.split("/")[1]}` as keyof typeof NAV_TITLE] ||
    "Unknown Page";

  return (
    <div className="pt fixed inset-x-0 top-0 mx-auto flex w-full max-w-lg items-center justify-between bg-body-default px-4 pb-3 pt-5">
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
