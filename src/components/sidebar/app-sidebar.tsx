"use client";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { sideBarAccountInfoItems, SideBarNavItems } from "./demo_data";
import { Search } from "lucide-react";

import { useRef, useEffect } from "react";
import SearchBar from "./search_bar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const { state, setOpen } = useSidebar();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "expanded" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [state]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mb-4">
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
                  <h1 className="font-bold text-xl">EggShell</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {state == "collapsed" ? (
          <div className="flex items-center justify-center p-2">
            <SidebarMenuButton
              onClick={(e) => {
                setOpen(true);
              }}
              tooltip={"Search"}
              className="cursor-pointer mb-0"
            >
              <Search size={16} />
            </SidebarMenuButton>
          </div>
        ) : (
          <>
            <SidebarGroupLabel className="h-fit w-fit -mb-5 px-3">
              Search
            </SidebarGroupLabel>
            <SearchBar ref={searchInputRef} />
          </>
        )}
        <NavMain navItems={SideBarNavItems} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="mb-2">
        {sideBarAccountInfoItems.map((opt) => (
          <SidebarMenuItem key={opt.title} className="list-none">
            <SidebarMenuButton
              asChild
              className={`flex items-center gap-2 px-3 py-2 hover:bg-accent/60 ${
                path === opt.href
                  ? "bg-sidebar-accent/80 text-sidebar-accent-foreground"
                  : ""
              }`}
            >
              <Link href={opt.href} className="flex items-center gap-2">
                {opt.icon && <opt.icon size={16} />}
                <span>{opt.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarFooter>
    </Sidebar>
  );
}
