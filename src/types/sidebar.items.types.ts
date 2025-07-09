import { type LucideIcon } from "lucide-react";

interface EndItem {
  title: string;
  href: string;
  icon: LucideIcon | undefined;
  disabled: boolean;
}

interface SubItem {
  subItemName: string;
  href: string;
  icon: LucideIcon | undefined;
  disabled: boolean;
  isEndItem: boolean;
  EndItemsList?: EndItem[];
}

export interface SidebarItemTypes {
  title: string;
  href?: string;
  icon?: LucideIcon | undefined;
  disabled: boolean;
  isSubItem: boolean;
  SubItemsList?: SubItem[];
}

export type SidebarItems = SidebarItemTypes[];
