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
import { Search, ShoppingCart } from "lucide-react";

import { useRef, useEffect } from "react";
import SearchBar from "./search_bar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartSheet } from "../CartSheet";
import { SheetTrigger } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { useCart } from "@/state/useCart";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { itemCount } = useCart();
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
                  <h1 className="font-bebas text-xl">EggShell</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
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
              tooltip={opt.title}
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
        {/* Cart button moved to the bottom */}
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={"Cart"}
            isActive={itemCount > 0}
            className="py-0 p-0 cursor-pointer transition duration-300"
          >
            <CartSheet>
              <SheetTrigger asChild>
                <span
                  className={`${state === "collapsed" ? "px-0" : "px-3"} relative w-full flex items-center h-full transition duration-300`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {/* Show text only when expanded */}
                  {state === "expanded" && (
                    <span className="ml-2 text-sm">Cart</span>
                  )}
                  {itemCount > 0 && state === "expanded" && (
                    <Badge
                      variant="destructive"
                      className="absolute top-2 right-3 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center px-3"
                    >
                      {itemCount > 100 ? "99+" : itemCount}
                    </Badge>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </span>
              </SheetTrigger>
            </CartSheet>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
