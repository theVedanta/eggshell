"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { AppSidebar } from "./sidebar/app-sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Main Content */}
        <main className="flex-1 min-h-0">
          <div className="container-wide mx-auto px-4 py-6">{children}</div>
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
