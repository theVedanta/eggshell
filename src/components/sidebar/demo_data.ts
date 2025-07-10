import {
  SideBarAccountInfoItems,
  SidebarItems,
} from "@/types/sidebar.items.types";
import {
  BriefcaseBusiness,
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
    disabled: false,
    isSubItem: false,
  },
  {
    title: "Store",
    href: "/store",
    icon: Store,
    disabled: false,
    isSubItem: false,
  },
  {
    title: "Categories",
    icon: LayoutDashboard,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        subItemName: "Footwear",
        href: "/store/category/footwear",
        icon: undefined,
        disabled: false,
        isEndItem: true,
        EndItemsList: [
          {
            title: "Sneakers",
            href: "/store/category/footwear/sneakers",
            icon: undefined,
            disabled: false,
          },
          {
            title: "Trainers",
            href: "/store/category/footwear/trainers",
            icon: undefined,
            disabled: false,
          },
        ],
      },
      {
        subItemName: "Clothing",
        href: "/category/clothing",
        icon: undefined,
        disabled: false,
        isEndItem: true,
        EndItemsList: [
          {
            title: "T-Shirts",
            href: "/store/category/clothing/t-shirts",
            icon: undefined,
            disabled: false,
          },
          {
            title: "Jeans",
            href: "/store/category/clothing/jeans",
            icon: undefined,
            disabled: false,
          },
        ],
      },
      {
        subItemName: "Accessories",
        href: "/store/category/accessories",
        icon: undefined,
        disabled: false,
        isEndItem: false,
      },
      {
        subItemName: "Bags",
        href: "/store/category/bags",
        icon: undefined,
        disabled: false,
        isEndItem: true,
        EndItemsList: [
          {
            title: "Backpacks",
            href: "/store/category/bags/backpacks",
            icon: undefined,
            disabled: false,
          },
          {
            title: "Handbags",
            href: "/store/category/bags/handbags",
            icon: undefined,
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    title: "Brands",
    href: "/brands",
    icon: BriefcaseBusiness,
    disabled: false,
    isSubItem: false,
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
