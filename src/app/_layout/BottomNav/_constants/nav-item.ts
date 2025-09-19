import Home from "@/assets/icons/home/home.svg";
import HomeFill from "@/assets/icons/home/home_fill.svg";
import Search from "@/assets/icons/search/search.svg";
import SearchFill from "@/assets/icons/search/search_fill.svg";
import MyList from "@/assets/icons/myLists/myLists.svg";
import MyListFill from "@/assets/icons/myLists/myLists_fill.svg";
import Profile from "@/assets/icons/profile/profile.svg";
import ProfileFill from "@/assets/icons/profile/profile_fill.svg";
import LogIn from "@/assets/icons/login/login.svg";

export const BASE_NAV_ITEMS = [
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

export const PROFILE_ITEM = {
  path: "/profile",
  label: "Profile",
  Icon: Profile,
  IconFill: ProfileFill,
} as const;

export const LOGIN_ITEM = {
  path: "/login",
  label: "Login",
  Icon: LogIn,
} as const;
