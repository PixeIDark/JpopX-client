"use client";

import Home from "@/assets/icons/home/home.svg";
import HomeFill from "@/assets/icons/home/home_fill.svg";
import BottomNavItem from "@/app/_components/layout/BottomNav/BottomNavItem";
import { useSelectedLayoutSegment } from "next/navigation";

function BottomNav() {
  const segment = useSelectedLayoutSegment();
  if (segment === "(auth)") return null;

  const navItems = [
    {
      path: "/",
      label: "home",
      Icon: Home,
      IconFill: HomeFill,
    },
  ];

  return (
    <div className="pt fixed bottom-0 -mx-4 flex w-full items-center justify-between border-t border-solid-default bg-body-default px-4 pb-3 pt-5">
      {navItems.map((item) => (
        <BottomNavItem
          key={item.path}
          path={item.path}
          label={item.label}
          Icon={item.Icon}
          IconFill={item.IconFill}
        />
      ))}
    </div>
  );
}

export default BottomNav;
