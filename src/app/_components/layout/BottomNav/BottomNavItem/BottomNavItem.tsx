"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BottomNavItemProps {
  path: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconFill: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function BottomNavItem({ path, label, Icon, IconFill }: BottomNavItemProps) {
  const pathname = usePathname();

  const isActive = path === pathname;
  return (
    <Link href={path} className="flex w-16 flex-col items-center justify-center gap-1">
      {isActive ? (
        <IconFill width={24} height={24} className="fill-icon-bg" />
      ) : (
        <Icon width={24} height={24} className="fill-icon-stroke" />
      )}
      <p className="text-xs text-text-p">{label}</p>
    </Link>
  );
}

export default BottomNavItem;
