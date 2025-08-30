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
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SideBarNavItems } from "./demo_data";
import SearchBar from "./search_bar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePrefetchAllBrands } from "@/query-calls/brands-query";
import { useEffect } from "react";
import { usePrefetchSideBarSubcategoriesByCategory } from "@/query-calls/sidebar-opts";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const { prefetchBrands } = usePrefetchAllBrands();
  const { prefetchSubcategories } = usePrefetchSideBarSubcategoriesByCategory();
  useEffect(() => {
    prefetchBrands();
    prefetchSubcategories("footwear");
    prefetchSubcategories("accessories");
    prefetchSubcategories("apparel");
  }, [prefetchBrands, prefetchSubcategories]);

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
        <div className="w-full grid px-3 py-4 border-t">
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center">
              <UserButton />{" "}
              <div className="flex flex-col px-3">
                <span className="text-xs text-white/70 flex-initial">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-white/70">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </div>
          </SignedIn>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
