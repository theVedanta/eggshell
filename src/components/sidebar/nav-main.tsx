"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { SidebarItems } from "@/types/sidebar.items.types";
import Link from "next/link";

export function NavMain({ navItems }: { navItems: SidebarItems }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              {item.SubItemsList && item.SubItemsList.length > 0 ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
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
                                <SidebarMenuSubButton>
                                  <span>{subItem.subItemName}</span>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/nested-collapsible:rotate-90" />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {subItem.EndItemsList.map((endItem) => (
                                    <SidebarMenuSubItem key={endItem.title}>
                                      <SidebarMenuSubButton asChild>
                                        <a href={endItem.href}>
                                          <span>{endItem.title}</span>
                                        </a>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.href}>
                                <span>{subItem.subItemName}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
