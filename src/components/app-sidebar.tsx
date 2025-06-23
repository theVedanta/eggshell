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
    Search,
    User,
    Settings,
    Heart,
    Package,
    Tag,
    ChevronRight,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { categories } from "@/lib/db";

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
        title: "Cart",
        url: "/cart",
        icon: ShoppingCart,
    },
    {
        title: "Checkout",
        url: "/checkout",
        icon: CreditCard,
    },
    {
        title: "Wishlist",
        url: "/wishlist",
        icon: Heart,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: Package,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state } = useCart();

    return (
        <Sidebar collapsible="icon" className="ecommerce-sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                                    <ShoppingBag className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Eggshell Store
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        Modern Fashion
                                    </span>
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
                                                            {subItem.icon && (
                                                                <subItem.icon className="size-3" />
                                                            )}
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

                {/* Quick Categories */}
                <SidebarGroup>
                    <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {categories.map((category) => (
                                <SidebarMenuItem key={category.id}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={category.name}
                                    >
                                        <Link
                                            href={`/category/${category.id}`}
                                            className={
                                                pathname ===
                                                `/category/${category.id}`
                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                    : ""
                                            }
                                        >
                                            {category.id === "apparel" && (
                                                <ShoppingBag className="size-4" />
                                            )}
                                            {category.id === "footwear" && (
                                                <Footprints className="size-4" />
                                            )}
                                            {category.id === "accessories" && (
                                                <Watch className="size-4" />
                                            )}
                                            {category.id === "jewellery" && (
                                                <Gem className="size-4" />
                                            )}
                                            <span>{category.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account & Shopping */}
                <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accountItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                    >
                                        <Link
                                            href={item.url}
                                            className={
                                                pathname === item.url
                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                    : ""
                                            }
                                        >
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                            {item.title === "Cart" &&
                                                state.itemCount > 0 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-auto size-5 rounded-full p-0 text-xs"
                                                    >
                                                        {state.itemCount}
                                                    </Badge>
                                                )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/profile">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src="/avatar-placeholder.jpg"
                                        alt="User"
                                    />
                                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        John Doe
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        john@example.com
                                    </span>
                                </div>
                                <Settings className="size-4" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Quick Actions */}
                <div className="p-2 space-y-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        asChild
                    >
                        <Link href="/search">
                            <Search className="size-4 mr-2" />
                            Search Products
                        </Link>
                    </Button>

                    {state.itemCount > 0 && (
                        <Button
                            size="sm"
                            className="w-full justify-start btn-primary-gradient"
                            asChild
                        >
                            <Link href="/cart">
                                <ShoppingCart className="size-4 mr-2" />
                                View Cart ({state.itemCount})
                            </Link>
                        </Button>
                    )}
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
