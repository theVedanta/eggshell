"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    ShoppingBag,
    Star,
    Watch,
    Footprints,
    Gem,
    ShoppingCart,
    CreditCard,
    User,
    Heart,
    Package,
    ChevronRight,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/state/useCart";
import { categories } from "@/lib/db";
import { Button } from "./ui/button";
import { CartSheet } from "./CartSheet";
import { SheetTrigger } from "./ui/sheet";

const mainNavItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Shop",
        icon: ShoppingBag,
        items: [
            {
                title: "All Products",
                url: "/shop",
            },
            {
                title: "Featured",
                url: "/shop/featured",
            },
            {
                title: "New Arrivals",
                url: "/shop/new",
            },
            {
                title: "Sale",
                url: "/shop/sale",
            },
        ],
    },
    {
        title: "Categories",
        icon: Package,
        items: [
            {
                title: "Apparel",
                url: "/category/apparel",
                icon: ShoppingBag,
            },
            {
                title: "Footwear",
                url: "/category/footwear",
                icon: Footprints,
            },
            {
                title: "Accessories",
                url: "/category/accessories",
                icon: Watch,
            },
            {
                title: "Jewellery",
                url: "/category/jewellery",
                icon: Gem,
            },
        ],
    },
    {
        title: "Brands",
        url: "/brands",
        icon: Star,
    },
];

const accountItems = [
    {
        title: "Wishlist",
        url: "/wishlist",
        icon: Heart,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { itemCount } = useCart();

    return (
        <Sidebar collapsible="icon" className="ecommerce-sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-2 py-1.5"
                            >
                                <img
                                    src="/assets/logo/1x.png"
                                    alt="Eggshell Store Logo"
                                    className="w-12 h-12 object-contain"
                                    width={64}
                                    height={64}
                                />

                                <div className="flex flex-col justify-center min-w-0">
                                    <h1 className="font-mono text-2xl">
                                        EggShell
                                    </h1>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.items ? (
                                        <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 data-[state=open]:rotate-90" />
                                        </SidebarMenuButton>
                                    ) : (
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <Link
                                                href={item.url!}
                                                className={
                                                    pathname === item.url
                                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                        : ""
                                                }
                                            >
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                    {item.items && (
                                        <SidebarMenuSub>
                                            {item.items.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        className={
                                                            pathname ===
                                                            subItem.url
                                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                                : ""
                                                        }
                                                    >
                                                        <Link
                                                            href={subItem.url}
                                                        >
                                                            {"icon" in
                                                                subItem &&
                                                            subItem.icon ? (
                                                                <subItem.icon className="size-3" />
                                                            ) : null}
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account & Shopping */}
                <div className="mt-auto flex items-center justify-around gap-2 px-3 pb-4">
                    {accountItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            title={item.title}
                        >
                            <Button
                                variant="secondary"
                                size="icon"
                                className="relative"
                            >
                                <item.icon className="size-5" />
                                {/* <span>{item.title}</span> */}
                                {item.title === "Cart" && itemCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                    >
                                        {itemCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    ))}

                    <Button size="icon" variant="secondary">
                        <CartSheet>
                            <SheetTrigger asChild>
                                <span className="relative">
                                    <ShoppingCart className="h-4 w-4" />
                                    {itemCount > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                        >
                                            {itemCount}
                                        </Badge>
                                    )}
                                    <span className="sr-only">
                                        Shopping cart
                                    </span>
                                </span>
                            </SheetTrigger>
                        </CartSheet>
                    </Button>
                </div>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
