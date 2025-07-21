"use client";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { SideBarNavItems } from "./demo_data";
import SearchBar from "./search_bar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className={`h-screen z-40`} {...props}>
      <SidebarHeader className="mb-4 mt-3 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-3 px-2 py-1.5">
                <Image
                  src="/assets/logo/1x.png"
                  alt="Eggshell Store Logo"
                  className="w-12 h-12 object-contain"
                  width={64}
                  height={64}
                />

                <div className="flex flex-col justify-center min-w-0">
                  <h1 className="font-bebas text-xl">EggShell</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col overflow-hidden">
        <>
          <SidebarGroupLabel className="h-fit w-fit -mb-5 px-3">
            Search
          </SidebarGroupLabel>
          <SearchBar />
        </>
        <div className="flex-1 overflow-auto" id="NavSlider">
          <NavMain navItems={SideBarNavItems} />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
