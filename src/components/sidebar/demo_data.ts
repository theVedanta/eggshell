import { SidebarItems } from "@/types/sidebar.items.types";
import {
  BriefcaseBusiness,
  Footprints,
  Home,
  PersonStanding,
  ScrollText,
  Shirt,
  User,
} from "lucide-react";
import BrandImage from "@/../public/assets/logo/nike.jpg";

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
    title: "Brands",
    href: "/brands",
    subMenuViewName: "brands",
    icon: BriefcaseBusiness,
    disabled: false,
    isSubItem: true,
  },
  {
    title: "Footwear",
    href: "/footwear",
    subMenuViewName: "footwear",
    icon: Footprints,
    disabled: false,
    isSubItem: true,
  },
  {
    title: "Apparel",
    href: "/apparel",
    subMenuViewName: "apparel",
    icon: Shirt,
    disabled: false,
    isSubItem: true,
  },
  {
    title: "Accessories",
    href: "/accessories",
    subMenuViewName: "accessories",
    icon: PersonStanding,
    disabled: false,
    isSubItem: true,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ScrollText,
    disabled: false,
    isSubItem: false,
    subMenuViewName: undefined,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    isSubItem: false,
    subMenuViewName: undefined,
    disabled: false,
  },
];
