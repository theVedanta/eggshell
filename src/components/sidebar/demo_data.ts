import {
  SideBarAccountInfoItems,
  SidebarItems,
} from "@/types/sidebar.items.types";
import {
  BriefcaseBusiness,
  Footprints,
  Home,
  LayoutDashboard,
  ScrollText,
  Store,
  User,
} from "lucide-react";

export const SideBarNavItems: SidebarItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    subMenuViewName: undefined,
    disabled: false,
    isSubItem: false,
  },
  {
    title: "Store",
    href: "/store",
    icon: Store,
    subMenuViewName: undefined,
    disabled: false,
    isSubItem: false,
  },
  {
    title: "Brands",
    href: "/brands",
    subMenuViewName: "brands",
    icon: BriefcaseBusiness,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        title: "Nike",
        href: "/brands/nike",
        icon: BriefcaseBusiness,
        disabled: false,
      },
      {
        title: "Adidas",
        href: "/brands/adidas",
        icon: BriefcaseBusiness,
        disabled: false,
      },
    ],
  },
  {
    title: "FootWares",
    href: "/footwares",
    subMenuViewName: "footwares",
    icon: Footprints,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        title: "Shoes",
        href: "/brands/nike",
        icon: BriefcaseBusiness,
        disabled: false,
      },
      {
        title: "Sanals",
        href: "/brands/adidas",
        icon: BriefcaseBusiness,
        disabled: false,
      },
    ],
  },
  {
    title: "Clothing",
    href: "/cloathing",
    subMenuViewName: "cloathing",
    icon: Footprints,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        title: "Shoes",
        href: "/brands/nike",
        icon: BriefcaseBusiness,
        disabled: false,
      },
      {
        title: "Sanals",
        href: "/brands/adidas",
        icon: BriefcaseBusiness,
        disabled: false,
      },
    ],
  },
];

export const sideBarAccountInfoItems: SideBarAccountInfoItems = [
  {
    title: "Orders",
    href: "/orders",
    icon: ScrollText,
    disabled: false,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    disabled: false,
  },
];
