"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/db";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
    variant?: "default" | "compact" | "featured";
}

export function ProductCard({
    product,
    className,
    variant = "default",
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0] || "/placeholder-product.jpg",
            color: product.colors[0] || "Default",
            size: product.sizes[0] || "Default",
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const discountPercentage = product.originalPrice
        ? Math.round(
              ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
          )
        : null;

    const cardVariants = {
        default: "group/card",
        compact: "group/card h-full",
        featured:
            "group/card bg-gradient-to-br from-card/50 to-card/30 border-2",
    };

    const imageVariants = {
        default: "aspect-[4/5]",
        compact: "aspect-square",
        featured: "aspect-[4/5]",
    };

    return (
        <Link href={`/product/${product.id}`}>
            <Card
                className={cn(
                    "product-card ecommerce-card overflow-hidden transition-all duration-300 hover:shadow-xl py-0",
                    cardVariants[variant],
                    className,
                )}
            >
                <CardContent className="p-0">
                    {/* Image Container */}
                    <div
                        className={cn(
                            "product-image-container relative overflow-hidden",
                            imageVariants[variant],
                        )}
                    >
                        {/* Product Image */}
                        <Image
                            src={
                                product.images[0] || "/placeholder-product.jpg"
                            }
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 rounded-t-2xl rounded-b-none"
                            onError={() => setImageError(true)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-colors duration-300" />

                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                                onClick={handleWishlist}
                            >
                                <Heart
                                    className={cn(
                                        "h-4 w-4 transition-colors",
                                        isWishlisted
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-600",
                                    )}
                                />
                            </Button>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="h-4 w-4 text-gray-600" />
                            </Button>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                            {product.featured && (
                                <Badge className="bg-white/60 backdrop-blur-md text-black-700 border border-white/40 font-semibold shadow-md">
                                    <Star className="h-3 w-3 fill-black-500 text-black-500 mr-1" />
                                    Featured
                                </Badge>
                            )}
                            {discountPercentage && (
                                <Badge
                                    variant="destructive"
                                    className="bg-red-500"
                                >
                                    -{discountPercentage}%
                                </Badge>
                            )}
                            {!product.inStock && (
                                <Badge
                                    variant="secondary"
                                    className="bg-gray-500 text-white"
                                >
                                    Out of Stock
                                </Badge>
                            )}
                        </div>

                        {/* Quick view on hover for featured variant */}
                        {variant === "featured" && (
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex gap-2">
                                <Button
                                    className="w-1/2 flex items-center justify-center gap-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/30 shadow-lg text-gray-900 hover:bg-white/60 transition-all"
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                >
                                    <ShoppingCart className="h-4 w-4 opacity-80" />
                                    <span className="text-xs font-semibold">
                                        Add
                                    </span>
                                </Button>
                                <Button
                                    className="w-1/2 flex items-center justify-center gap-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/30 shadow-lg text-gray-900 hover:bg-white/60 transition-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // Add to cart first, then redirect to checkout
                                        addToCart({
                                            productId: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image:
                                                product.images[0] ||
                                                "/placeholder-product.jpg",
                                            color:
                                                product.colors[0] || "Default",
                                            size: product.sizes[0] || "Default",
                                        });
                                        window.location.href = "/checkout";
                                    }}
                                    disabled={!product.inStock}
                                >
                                    <Plus />
                                    <span className="text-xs font-semibold">
                                        Buy
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4 space-y-3">
                        {/* Brand */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground font-medium">
                                {product.brand}
                            </span>

                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">
                                    {product.rating} ({product.reviewCount})
                                </span>
                            </div>
                        </div>

                        {/* Product Name */}
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover/card:text-primary transition-colors">
                            {product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                            <span className="price-display text-foreground">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="price-original">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Colors (if not compact) */}
                        {variant !== "compact" && product.colors.length > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground mr-2">
                                    Colors:
                                </span>
                                <div className="flex gap-1">
                                    {product.colors
                                        .slice(0, 4)
                                        .map((color, index) => (
                                            <div
                                                key={index}
                                                className="w-3 h-3 rounded-full border border-border"
                                                style={{
                                                    backgroundColor:
                                                        color.toLowerCase() ===
                                                        "white"
                                                            ? "#ffffff"
                                                            : color.toLowerCase() ===
                                                                "black"
                                                              ? "#000000"
                                                              : color.toLowerCase() ===
                                                                  "gray"
                                                                ? "#6b7280"
                                                                : color.toLowerCase() ===
                                                                    "navy"
                                                                  ? "#1e3a8a"
                                                                  : color.toLowerCase() ===
                                                                      "brown"
                                                                    ? "#92400e"
                                                                    : color.toLowerCase() ===
                                                                        "green"
                                                                      ? "#059669"
                                                                      : color.toLowerCase() ===
                                                                          "blue"
                                                                        ? "#2563eb"
                                                                        : color.toLowerCase() ===
                                                                            "red"
                                                                          ? "#dc2626"
                                                                          : "#6b7280",
                                                }}
                                                title={color}
                                            />
                                        ))}
                                    {product.colors.length > 4 && (
                                        <span className="text-xs text-muted-foreground">
                                            +{product.colors.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center justify-between">
                            <span
                                className={cn(
                                    "text-xs font-medium",
                                    product.inStock
                                        ? "text-green-600"
                                        : "text-red-600",
                                )}
                            >
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
