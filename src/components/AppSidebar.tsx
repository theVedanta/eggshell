"use client";

import * as React from "react";
import Link from "next/link";
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

import { Badge } from "@/components/ui/badge";
import { useCart } from "@/state/useCart";
import { categories, brands } from "@/lib/db";

const leftRailItems = [
    {
        key: "home",
        title: "Home",
        icon: Home,
        url: "/",
    },
    {
        key: "apparel",
        title: "Apparel",
        icon: ShoppingBag,
        url: "/category/apparel",
    },
    {
        key: "jewellery",
        title: "Jewellery",
        icon: Gem,
        url: "/category/jewellery",
    },
    {
        key: "brands",
        title: "Brands",
        icon: Star,
        url: "/brands",
    },
    {
        key: "cart",
        title: "Cart",
        icon: ShoppingCart,
        url: "/cart",
    },
];

const getSubmenu = (key: string) => {
    if (key === "apparel") {
        const apparel = categories.find((c) => c.id === "apparel");
        if (!apparel) return null;
        return (
            <div className="flex flex-col gap-1 p-4">
                <div className="font-semibold mb-2">Apparel</div>
                {apparel.subcategories.map((sub) => (
                    <Link
                        key={sub}
                        href={`/category/apparel?sub=${encodeURIComponent(
                            sub
                        )}`}
                        className="hover:bg-muted rounded px-2 py-1"
                    >
                        {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </Link>
                ))}
            </div>
        );
    }
    if (key === "jewellery") {
        const jewellery = categories.find((c) => c.id === "jewellery");
        if (!jewellery) return null;
        return (
            <div className="flex flex-col gap-1 p-4">
                <div className="font-semibold mb-2">Jewellery</div>
                {jewellery.subcategories.map((sub) => (
                    <Link
                        key={sub}
                        href={`/category/jewellery?sub=${encodeURIComponent(
                            sub
                        )}`}
                        className="hover:bg-muted rounded px-2 py-1"
                    >
                        {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </Link>
                ))}
            </div>
        );
    }
    if (key === "brands") {
        return (
            <div className="flex flex-col gap-1 p-4 min-w-[200px]">
                <div className="font-semibold mb-2">Brands</div>
                {brands.map((brand) => (
                    <Link
                        key={brand.id}
                        href={`/brands/${brand.id}`}
                        className="flex items-center gap-2 hover:bg-muted rounded px-2 py-1"
                    >
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-6 h-3 object-contain"
                        />
                        <span>{brand.name}</span>
                    </Link>
                ))}
            </div>
        );
    }
    return null;
};

export function AppSidebar() {
    const { itemCount } = useCart();
    const [hovered, setHovered] = React.useState<string | null>(null);

    return (
        <div
            className="flex h-screen sticky top-0 left-0 z-40"
            onMouseLeave={() => setHovered(null)}
        >
            {/* Thin Left Rail */}
            <nav className="flex flex-col items-center bg-sidebar border-r w-16 py-4 gap-2 z-20 h-screen sticky top-0 left-0">
                {leftRailItems.map((item) => (
                    <div
                        key={item.key}
                        className="flex flex-col items-center py-1"
                    >
                        <button
                            className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent focus:bg-sidebar-accent transition-colors ${
                                hovered === item.key ? "bg-sidebar-accent" : ""
                            }`}
                            onMouseEnter={() => setHovered(item.key)}
                            onFocus={() => setHovered(item.key)}
                            onBlur={() => setHovered(null)}
                            aria-label={item.title}
                            tabIndex={0}
                        >
                            <Link
                                href={item.url}
                                className="flex items-center justify-center p-1 w-full h-full relative"
                            >
                                <item.icon className="w-5 h-5" />
                                {item.key === "cart" && itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                                {/* <span className="text-[10px] text-muted-foreground mt-1 text-center w-12 leading-tight whitespace-nowrap">
                                    {item.title}
                                </span> */}
                            </Link>
                        </button>
                    </div>
                ))}
            </nav>
            {/* Wide Right Rail (submenu) */}
            <div
                className={`transition-all duration-200 ${
                    hovered && hovered !== "cart" && hovered !== "home"
                        ? "w-56 opacity-100"
                        : "w-0 opacity-0 pointer-events-none"
                } bg-sidebar shadow-lg h-full z-10`}
            >
                {hovered &&
                    hovered !== "cart" &&
                    hovered !== "home" &&
                    getSubmenu(hovered)}
            </div>
        </div>
    );
}
