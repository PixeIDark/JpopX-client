"use client";

import Home from "@/assets/icons/home/home.svg";
import HomeFill from "@/assets/icons/home/home_fill.svg";
import Search from "@/assets/icons/search/search.svg";
import SearchFill from "@/assets/icons/search/search_fill.svg";
import MyList from "@/assets/icons/myLists/myLists.svg";
import MyListFill from "@/assets/icons/myLists/myLists_fill.svg";
import BottomNavItem from "@/app/_layout/BottomNav/BottomNavItem";
import { useSelectedLayoutSegment } from "next/navigation";

const NAV_ITEMS = [
  {
    path: "/",
    label: "Home",
    Icon: Home,
    IconFill: HomeFill,
  },
  {
    path: "/search",
    label: "Search",
    Icon: Search,
    IconFill: SearchFill,
  },
  {
    path: "/mylist",
    label: "My List",
    Icon: MyList,
    IconFill: MyListFill,
  },
] as const;

function BottomNav() {
  const segment = useSelectedLayoutSegment();
  if (segment === "(auth)") return null;

  return (
    <div>
      <div className="pt fixed bottom-0 flex w-full items-center justify-between border-t border-solid-default bg-body-default px-4 pb-3 pt-5">
        {NAV_ITEMS.map((item) => (
          <BottomNavItem key={item.path} item={item} />
        ))}
      </div>
      <div className="h-[77px] w-full" />
    </div>
  );
}

export default BottomNav;
