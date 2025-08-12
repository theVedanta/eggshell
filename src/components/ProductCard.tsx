"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, ShoppingCart, Star } from "lucide-react";
import tailwindColorMapping from "@/lib/tailwindColorMapping";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OldProduct } from "@/lib/db";
import { useCart } from "@/state/useCart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: OldProduct;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function ProductCard({
  product,
  className,
  variant = "default",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [maxColors, setMaxColors] = useState(2);
  const addToCart = useCart((s) => s.addToCart);

  // Fix hydration issue: set maxColors on client after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMaxColors(4);
      } else {
        setMaxColors(2);
      }
    }
  }, []);

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
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const cardVariants = {
    default: "group/card",
    compact: "group/card h-full",
    featured: "group/card bg-gradient-to-br from-card/50 to-card/30 border-2",
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
          "product-card ecommerce-card overflow-hidden transition-all duration-300 rounded-none bg-neutral-950 hover:shadow-xl py-0",
          cardVariants[variant],
          className
        )}
      >
        <CardContent className="p-0">
          {/* Image Container */}
          <div
            className={cn(
              "product-image-container relative overflow-hidden rounded-none",
              imageVariants[variant]
            )}
          >
            {/* Product Image */}
            <Image
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-colors duration-300" />

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                onClick={handleWishlist}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  )}
                />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1 w-[66%]">
              {/* {product.featured && (
                                <Badge className="bg-background/60 backdrop-blur-md text-black-700 border border-primary/40 font-semibold shadow-md">
                                    <Crown className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                                    Featured
                                </Badge>
                            )} */}
              {/* {discountPercentage && (
                                <Badge variant="destructive">
                                    -{discountPercentage}%
                                </Badge>
                            )} */}
              {!product.inStock && (
                <Badge variant="secondary" className="bg-gray-500 text-primary">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quick view on hover for featured variant */}

            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex gap-2">
              <Button
                className="w-1/2 flex items-center justify-center gap-2 rounded-xl bg-primary/80 backdrop-blur-md border border-primary/30 shadow-lg text-gray-900 hover:bg-primary/60 transition-all"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 opacity-80" />
                <span className="text-xs font-semibold">Add</span>
              </Button>
              <Button
                className="w-1/2 flex items-center justify-center gap-2 rounded-xl bg-primary/80 backdrop-blur-md border border-primary/30 shadow-lg text-gray-900 hover:bg-primary/60 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Add to cart first, then redirect to checkout
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0] || "/placeholder-product.jpg",
                    color: product.colors[0] || "Default",
                    size: product.sizes[0] || "Default",
                  });
                  window.location.href = "/checkout";
                }}
                disabled={!product.inStock}
              >
                <Plus />
                <span className="text-xs font-semibold">Buy</span>
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="py-2 space-y-1">
            {/* Product Name */}
            <h3 className="font-bebas text-base md:text-xl line-clamp-1 group-hover/card:text-primary">
              {product.name}
            </h3>

            {/* Brand */}
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-muted-foreground font-semibold line-clamp-1">
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

            {/* Price */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="price-display text-foreground text-sm md:text-base">
                  ₹{product.price.toFixed(2)}
                </span>
                <br className="block md:hidden" />
                {product.originalPrice && (
                  <span className="price-original md:pl-2 text-sm md:text-base">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {variant !== "compact" && product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    {/* Responsive color display: 2 on mobile, 4 on desktop */}
                    <div className="flex items-center space-x-1 md:space-x-2">
                      {product.colors
                        .slice(0, maxColors)
                        .map((color, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${color.toLowerCase() === "black" ? "border border-primary/60" : ""}`}
                            style={{
                              backgroundColor:
                                tailwindColorMapping[color.toLowerCase()] ||
                                "#6b7280",
                            }}
                            title={color}
                          />
                        ))}
                      {product.colors.length > maxColors && (
                        <span className="text-xs text-muted-foreground">
                          +{product.colors.length - maxColors}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
