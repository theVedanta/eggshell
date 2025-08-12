"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, ShoppingCart, Star } from "lucide-react";
import tailwindColorMapping from "@/lib/tailwindColorMapping";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/state/useCart";
import { cn } from "@/lib/utils";
import type { GSheetProduct } from "@/types/products.type";

interface ProductCardProps {
  product: GSheetProduct;
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
  const addToCart = useCart((s) => s.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      selectedColor: product.colors[0]?.productColor || "Default",
      selectedImage:
        product.colors[0]?.productImages[0] || "/placeholder-product.jpg",
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
    <Link href={`/product/${product.id}`} className="grid">
      <Card
        className={cn(
          "product-card ecommerce-card overflow-hidden transition-all duration-300 rounded-none bg-neutral-950 hover:shadow-xl py-0 w-full max-w-full min-w-0",
          cardVariants[variant],
          className
        )}
      >
        <CardContent className="p-0 w-full max-w-full min-w-0">
          {/* Image Container */}
          <div
            className={cn(
              "product-image-container relative overflow-hidden rounded-none w-full max-w-full",
              imageVariants[variant]
            )}
          >
            {/* Product Image */}
            <Image
              src={
                product.colors[0].productImages[0] || "/placeholder-product.jpg"
              }
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 rounded-lg"
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
            <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[66%]">
              {!product.inStock && (
                <Badge
                  variant="secondary"
                  className="bg-gray-500 text-primary text-xs"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quick view on hover */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex gap-2">
              <Button
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary/80 backdrop-blur-md border border-primary/30 shadow-lg text-gray-900 hover:bg-primary/60 transition-all min-w-0"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 opacity-80 flex-shrink-0" />
                <span className="text-xs font-semibold truncate">Add</span>
              </Button>
              <Button
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary/80 backdrop-blur-md border border-primary/30 shadow-lg text-gray-900 hover:bg-primary/60 transition-all min-w-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    selectedColor: product.colors[0]?.productColor || "Default",
                    selectedImage:
                      product.colors[0]?.productImages[0] ||
                      "/placeholder-product.jpg",
                    size: product.sizes[0] || "Default",
                  });
                  window.location.href = "/checkout";
                }}
                disabled={!product.inStock}
              >
                <Plus className="flex-shrink-0" />
                <span className="text-xs font-semibold truncate">Buy</span>
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="py-2 space-y-1 w-full max-w-full min-w-0 overflow-hidden">
            {/* Product Name */}
            <h3 className="font-bebas text-base md:text-xl line-clamp-1 group-hover/card:text-primary overflow-hidden text-ellipsis">
              {product.name}
            </h3>

            {/* Brand and Rating */}
            <div className="flex items-center justify-between w-full max-w-full min-w-0 gap-2">
              <span className="text-xs md:text-sm text-muted-foreground font-semibold truncate flex-1 min-w-0">
                {product.brand}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Price and Colors */}
            <div className="flex items-start justify-between gap-2 w-full max-w-full min-w-0">
              <div className="flex-shrink-0 min-w-0">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="price-display text-foreground text-sm md:text-base whitespace-nowrap">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="price-original text-sm md:text-base line-through text-muted-foreground whitespace-nowrap">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {variant !== "compact" && product.colors.length > 0 && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex gap-1 overflow-hidden">
                    {/* Show 2 colors on mobile, 4 on desktop using CSS */}
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0",
                          // Hide 3rd and 4th colors on mobile
                          index >= 2 && "hidden md:block",
                          color.productColor.toLowerCase() === "black" &&
                            "border border-primary/60"
                        )}
                        style={{
                          backgroundColor:
                            tailwindColorMapping[
                              color.productColor.toLowerCase()
                            ] || "#6b7280",
                        }}
                        title={color.productColor}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        +{product.colors.length - 4}
                      </span>
                    )}
                    {product.colors.length > 2 && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap md:hidden">
                        +{product.colors.length - 2}
                      </span>
                    )}
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
