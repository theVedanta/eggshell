"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Home } from "lucide-react";

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
                    <div className="container-wide mx-auto px-4 py-6">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                {/* <footer className="border-t bg-muted/50 py-8 mt-auto">
                    <div className="container-wide mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">
                                    Eggshell Store
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Your destination for modern fashion and
                                    premium lifestyle products.
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="flex aspect-square size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                                        <ShoppingCart className="size-3" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        Modern Fashion
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium">Shop</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link
                                            href="/category/apparel"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Apparel
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/category/footwear"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Footwear
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/category/accessories"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Accessories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/category/jewellery"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Jewellery
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium">Account</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/orders"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Order History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/wishlist"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/cart"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Shopping Cart
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium">Support</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link
                                            href="/help"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/shipping"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Shipping Info
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/returns"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Returns
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-muted-foreground">
                                © 2024 Eggshell Store. All rights reserved.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <Link
                                    href="/privacy"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer> */}
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
            label = label
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
        }

        breadcrumbs.push({
            label,
            href: currentPath,
            isLast: i === segments.length - 1,
        });
    }

    return breadcrumbs;
}
