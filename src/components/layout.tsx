"use client";

import * as React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { AppSidebar } from "./sidebar/app-sidebar";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/env";
import ShimmerText from "./shimmer-text";
import CategorySelector from "./GetUserLiking";

function usePrefetchProducts() {
  return useQuery({
    queryKey: ["products-redis"],
    queryFn: async () => {
      const res = await fetch(API_URL + "/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.data; // <-- return the products array
    },
    staleTime: 5 * 60 * 1000, // 5 minutes, adjust as needed
  });
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isLoading } = usePrefetchProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-white text-lg">
          <ShimmerText text="EGGSHELL" />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar collapsible="offcanvas" />
      <SidebarInset>
        {/* Main Content */}
        <main className="flex-1 min-h-screen px-4 py-2 mb-2">
          <SidebarTrigger className="md:hidden w-10 h-10 m-3" />
          <div className="">{children}</div>
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [];

  // Always include home
  breadcrumbs.push({ label: <Home className="h-4 w-4" />, href: "/" });

  // Generate breadcrumbs based on path segments
  let currentPath = "";
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    let label = segments[i];

    // Format labels nicely
    if (label === "category") {
      label = "Categories";
    } else if (label === "product") {
      label = "Product";
    } else if (label === "cart") {
      label = "Shopping Cart";
    } else if (label === "checkout") {
      label = "Checkout";
    } else if (label === "brands") {
      label = "Brands";
    } else {
      // Capitalize and replace dashes with spaces
      label = label.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    breadcrumbs.push({
      label,
      href: currentPath,
      isLast: i === segments.length - 1,
    });
  }

  return breadcrumbs;
}
