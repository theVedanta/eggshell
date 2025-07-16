import { type LucideIcon } from "lucide-react";

export interface SubItem {
  title: string;
  href: string;
  icon: LucideIcon | undefined;
  disabled: boolean;
  brandImage?: string;
}

export interface SidebarItemTypes {
  title: string;
  subMenuViewName: string | undefined;
  href?: string;
  icon?: LucideIcon | undefined;
  disabled: boolean;
  isSubItem: boolean;
  SubItemsList?: SubItem[];
}

export type SidebarItems = SidebarItemTypes[];

interface SideBarAccountInfoItemsTypes {
  title: string;
  href: string;
  icon: LucideIcon | undefined;
  disabled: boolean;
}

export type SideBarAccountInfoItems = SideBarAccountInfoItemsTypes[];
