"use client";

import BottomNavItem from "@/app/_layout/BottomNav/BottomNavItem";
import { useSelectedLayoutSegments } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BASE_NAV_ITEMS,
  LOGIN_ITEM,
  PROFILE_ITEM,
} from "@/app/_layout/BottomNav/_constants/nav-item";
import { useEffect, useState } from "react";

type NavItem = (typeof BASE_NAV_ITEMS)[number] | typeof PROFILE_ITEM | typeof LOGIN_ITEM;

function BottomNav() {
  const segment = useSelectedLayoutSegments();
  const { status } = useSession();

  const [navItems, setNavItems] = useState<NavItem[]>([...BASE_NAV_ITEMS]);

  useEffect(() => {
    setNavItems([...BASE_NAV_ITEMS, status === "authenticated" ? PROFILE_ITEM : LOGIN_ITEM]);
  }, [status]);

  if (segment[0] === "(auth)" || segment[1] === "profile") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-lg items-center justify-between border-t border-solid-default bg-body-default px-4 pb-3 pt-5">
      {navItems.map((item) => (
        <BottomNavItem key={item.path} item={item} />
      ))}
    </div>
  );
}

export default BottomNav;
