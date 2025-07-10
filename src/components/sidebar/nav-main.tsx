"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarItems } from "@/types/sidebar.items.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ navItems }: { navItems: SidebarItems }) {
  const pathname = usePathname();
  const { state, open, setOpen } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            className="group/collapsible select-none"
          >
            <SidebarMenuItem>
              {item.SubItemsList && item.SubItemsList.length > 0 ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => {
                        if (!open) {
                          setOpen(true);
                        }
                      }}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.SubItemsList.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.subItemName}>
                          {subItem.EndItemsList &&
                          subItem.EndItemsList.length > 0 ? (
                            <Collapsible className="group/nested-collapsible">
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton className="data-[state=open]:text-sm data-[state=open]:text-sidebar-accent-foreground/50 text-sidebar-accent-foreground/80 cursor-pointer">
                                  <span>{subItem.subItemName}</span>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/nested-collapsible:rotate-90" />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {subItem.EndItemsList.map((endItem) => (
                                    <SidebarMenuSubItem key={endItem.title}>
                                      <SidebarMenuSubButton
                                        asChild
                                        className={`${
                                          pathname === endItem.href
                                            ? "bg-sidebar-accent/70 text-sidebar-accent-foreground"
                                            : ""
                                        }`}
                                      >
                                        <Link href={endItem.href}>
                                          <span>{endItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <SidebarMenuButton
                              asChild
                              key={subItem.subItemName}
                              tooltip={subItem.subItemName}
                              className={
                                pathname === subItem.href
                                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                  : ""
                              }
                            >
                              <Link href={subItem.href ?? ""}>
                                <span>{subItem.subItemName}</span>
                              </Link>
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  key={item.title}
                  tooltip={item.title}
                  className={
                    pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : ""
                  }
                >
                  <Link href={item.href ?? ""}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
