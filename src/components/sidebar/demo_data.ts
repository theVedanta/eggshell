import {
  SideBarAccountInfoItems,
  SidebarItems,
} from "@/types/sidebar.items.types";
import {
  BriefcaseBusiness,
  Footprints,
  Home,
  LayoutDashboard,
  PersonStanding,
  ScrollText,
  Shirt,
  Store,
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
    SubItemsList: [
      {
        title: "Urban Edge",
        href: "/brands/urban-edge",
        icon: BriefcaseBusiness,
        disabled: false,
        brandImage: BrandImage.src,
      },
      {
        title: "Minimal Co.",
        href: "/brands/minimal-co",
        icon: BriefcaseBusiness,
        disabled: false,
        brandImage: BrandImage.src,
      },
      {
        title: "Luxe Craft",
        href: "/brands/luxe-craft",
        icon: BriefcaseBusiness,
        disabled: false,
        brandImage: BrandImage.src,
      },
      {
        title: "Comfort Zone",
        href: "/brands/comfort-zone",
        icon: BriefcaseBusiness,
        disabled: false,
        brandImage: BrandImage.src,
      },
      {
        title: "Classic Heritage",
        href: "/brands/classic-heritage",
        icon: BriefcaseBusiness,
        disabled: false,
        brandImage: BrandImage.src,
      },
    ],
  },
  {
    title: "Footwear",
    href: "/footwear",
    subMenuViewName: "footwear",
    icon: Footprints,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        title: "Sneakers",
        href: "/footwears/sneakers",
        icon: BriefcaseBusiness,
        disabled: false,
      },
    ],
  },
  {
    title: "Apparel",
    href: "/apparel",
    subMenuViewName: "apparel",
    icon: Shirt,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        title: "T-Shirts",
        href: "/apparel/t-shirts",
        icon: BriefcaseBusiness,
        disabled: false,
      },
    ],
  },
  {
    title: "Accessories",
    href: "/accessories",
    subMenuViewName: "accessories",
    icon: PersonStanding,
    disabled: false,
    isSubItem: true,
    SubItemsList: [
      {
        title: "Caps",
        href: "/accessories/caps",
        icon: BriefcaseBusiness,
        disabled: false,
      },
      {
        title: "Backpacks",
        href: "/accessories/backpacks",
        icon: BriefcaseBusiness,
        disabled: false,
      },
    ],
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
