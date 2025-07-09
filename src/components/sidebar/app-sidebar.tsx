"use client";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SideBarNavItems } from "./demo_data";
import { Search } from "lucide-react";

import { useState } from "react";
import SearchBar from "./search_bar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const [open, setOpen] = useState(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {state == "collapsed" ? (
          <div className="flex items-center justify-center p-2">
            <Search
              size={16}
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        ) : (
          <SearchBar />
        )}
        <NavMain navItems={SideBarNavItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
