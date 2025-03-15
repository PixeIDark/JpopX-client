"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface BottomNavItemProps {
  path: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconFill?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function BottomNavItem({ item }: { item: BottomNavItemProps }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = item.path === pathname;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(item.path);
  };

  return (
    <a
      href={item.path}
      onClick={handleClick}
      className="flex w-16 flex-col items-center justify-center gap-1"
    >
      {isActive ? (
        item.IconFill && <item.IconFill width={24} height={24} className="fill-icon-bg" />
      ) : (
        <item.Icon width={24} height={24} className="fill-icon-stroke" />
      )}
      <p className="text-xs text-text-p">{item.label}</p>
    </a>
  );
}

export default BottomNavItem;
