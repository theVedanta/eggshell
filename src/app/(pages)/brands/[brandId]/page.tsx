"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Package, Grid, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/ProductCard";
import { brands, getProductsByBrand, categories } from "@/lib/db";
import Image from "next/image";

interface BrandPageProps {
    params: {
        brandId: string;
    };
}

export default function BrandPage({ params }: BrandPageProps) {
    const { brandId } = params;
    const brand = brands.find((b) => b.id === brandId);

    const brandProducts = useMemo(() => {
        return brand ? getProductsByBrand(brand.name) : [];
    }, [brand]);

    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    if (!brand) {
        notFound();
    }

    // Get categories for this brand's products
    const availableCategories = useMemo(() => {
        const categorySet = new Set(brandProducts.map((p) => p.category));
        return Array.from(categorySet);
    }, [brandProducts]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...brandProducts];

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory
            );
        }

        // Sort products
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                filtered.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return a.name.localeCompare(b.name);
                });
                break;
            case "featured":
            default:
                filtered.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                });
                break;
        }

        return filtered;
    }, [brandProducts, sortBy, selectedCategory]);

    const featuredProducts = brandProducts.filter((p) => p.featured);
    const averageRating =
        brandProducts.length > 0
            ? brandProducts.reduce((sum, p) => sum + p.rating, 0) /
              brandProducts.length
            : 0;

    const priceRange =
        brandProducts.length > 0
            ? {
                  min: Math.min(...brandProducts.map((p) => p.price)),
                  max: Math.max(
                      ...brandProducts.map((p) => p.originalPrice || p.price)
                  ),
              }
            : { min: 0, max: 0 };

    return (
        <div className="space-y-8">
            {/* Brand Header */}
            <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-3xl font-bold mb-4 overflow-hidden">
                    {brand.logo ? (
                        <Image
                            src={brand.logo}
                            alt={brand.name}
                            className="object-cover w-full h-full"
                            width={80}
                            height={80}
                            priority
                        />
                    ) : (
                        brand.name.charAt(0)
                    )}
                </div>

                <div>
                    <h1 className="text-4xl font-bold heading-gradient mb-4">
                        {brand.name}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        {brand.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {brand.featured && (
                            <Badge className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white border-0">
                                Featured Brand
                            </Badge>
                        )}
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                        >
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {averageRating.toFixed(1)} Rating
                        </Badge>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                        >
                            <Package className="w-3 h-3" />
                            {brandProducts.length} Products
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            Featured from {brand.name}
                        </h2>
                        <p className="text-muted-foreground">
                            Our top picks from this brand&apos;s collection
                        </p>
                    </div>

                    <div className="products-grid">
                        {brandProducts.slice(0, 4).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                variant="featured"
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* All Products */}
            <section>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            All Products
                        </h2>
                        <p className="text-muted-foreground">
                            {filteredProducts.length} of {brandProducts.length}{" "}
                            products
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Category Filter */}
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {availableCategories.map((categoryId) => {
                                    const category = categories.find(
                                        (c) => c.id === categoryId
                                    );
                                    return (
                                        <SelectItem
                                            key={categoryId}
                                            value={categoryId}
                                        >
                                            {category?.name || categoryId}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">
                                    Featured
                                </SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-low">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="price-high">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="rating">
                                    Highest Rated
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* View Toggle */}
                        <div className="flex border rounded-lg">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="rounded-r-none"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="rounded-l-none"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold mb-2">
                                No products found
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Try selecting a different category or check back
                                later
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setSelectedCategory("all")}
                            >
                                Show All Products
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div
                        className={
                            viewMode === "grid" ? "products-grid" : "space-y-4"
                        }
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                variant={
                                    viewMode === "list" ? "compact" : "default"
                                }
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Brand Categories */}
            {availableCategories.length > 1 && (
                <section className="bg-muted/50 rounded-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">
                            Shop {brand.name} by Category
                        </h2>
                        <p className="text-muted-foreground">
                            Explore different product categories from this brand
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {availableCategories.map((categoryId) => {
                            const category = categories.find(
                                (c) => c.id === categoryId
                            );
                            const categoryProducts = brandProducts.filter(
                                (p) => p.category === categoryId
                            );

                            if (!category) return null;

                            return (
                                <Button
                                    key={categoryId}
                                    variant="outline"
                                    className="h-auto p-4 flex flex-col items-center gap-2"
                                    onClick={() =>
                                        setSelectedCategory(categoryId)
                                    }
                                >
                                    <div className="text-2xl mb-2">
                                        {categoryId === "apparel" && "👕"}
                                        {categoryId === "footwear" && "👟"}
                                        {categoryId === "accessories" && "⌚"}
                                        {categoryId === "jewellery" && "💎"}
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold">
                                            {category.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {categoryProducts.length} products
                                        </div>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Back to all brands */}
            <div className="text-center pt-8">
                <Button variant="outline" asChild>
                    <Link href="/brands">&larr; Back to All Brands</Link>
                </Button>
            </div>
        </div>
    );
}
