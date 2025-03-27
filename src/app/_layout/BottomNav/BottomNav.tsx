"use client";

import BottomNavItem from "@/app/_layout/BottomNav/BottomNavItem";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  BASE_NAV_ITEMS,
  LOGIN_ITEM,
  PROFILE_ITEM,
} from "@/app/_layout/BottomNav/_constants/nav-item";
import { useSession } from "next-auth/react";

function BottomNav() {
  const segment = useSelectedLayoutSegments();
  const { data: session } = useSession();
  const isAuthenticated = (session?.refreshTokenExpires ?? 0) > Date.now();

  if (segment[0] === "(auth)" || segment[1] === "profile") return null;

  const NAV_ITEMS = [...BASE_NAV_ITEMS, isAuthenticated ? PROFILE_ITEM : LOGIN_ITEM];

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-lg items-center justify-between border-t border-solid-default bg-body-default px-4 pb-3 pt-5">
      {NAV_ITEMS.map((item) => (
        <BottomNavItem key={item.path} item={item} />
      ))}
    </div>
  );
}

export default BottomNav;
