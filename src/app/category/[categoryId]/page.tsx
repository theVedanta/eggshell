"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { Grid, List, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/product-card";
import { categories, getProductsByCategory } from "@/lib/db";

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { categoryId } = params;
    const category = categories.find((cat) => cat.id === categoryId);
    const allProducts = getProductsByCategory(categoryId);

    // Filter states
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    if (!category) {
        notFound();
    }

    // Get unique filter options
    const availableBrands = useMemo(() => {
        const brandSet = new Set(allProducts.map((p) => p.brand));
        return Array.from(brandSet).sort();
    }, [allProducts]);

    const availableColors = useMemo(() => {
        const colorSet = new Set(allProducts.flatMap((p) => p.colors));
        return Array.from(colorSet).sort();
    }, [allProducts]);

    const availableSizes = useMemo(() => {
        const sizeSet = new Set(allProducts.flatMap((p) => p.sizes));
        return Array.from(sizeSet).sort();
    }, [allProducts]);

    const maxPrice = useMemo(() => {
        return Math.max(...allProducts.map((p) => p.originalPrice || p.price));
    }, [allProducts]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = allProducts.filter((product) => {
            // Brand filter
            if (
                selectedBrands.length > 0 &&
                !selectedBrands.includes(product.brand)
            ) {
                return false;
            }

            // Color filter
            if (
                selectedColors.length > 0 &&
                !product.colors.some((color) => selectedColors.includes(color))
            ) {
                return false;
            }

            // Size filter
            if (
                selectedSizes.length > 0 &&
                !product.sizes.some((size) => selectedSizes.includes(size))
            ) {
                return false;
            }

            // Price filter
            const productPrice = product.originalPrice || product.price;
            if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
                return false;
            }

            // Stock filter
            if (inStockOnly && !product.inStock) {
                return false;
            }

            return true;
        });

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
                // For demo purposes, we'll sort by featured status then name
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
    }, [
        allProducts,
        selectedBrands,
        selectedColors,
        selectedSizes,
        priceRange,
        inStockOnly,
        sortBy,
    ]);

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const handleColorToggle = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    const handleSizeToggle = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setPriceRange([0, maxPrice]);
        setInStockOnly(false);
    };

    const activeFiltersCount =
        selectedBrands.length +
        selectedColors.length +
        selectedSizes.length +
        (inStockOnly ? 1 : 0);

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Brands */}
            <div>
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                    {availableBrands.map((brand) => (
                        <div
                            key={brand}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => handleBrandToggle(brand)}
                            />
                            <Label
                                htmlFor={`brand-${brand}`}
                                className="text-sm"
                            >
                                {brand}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Colors */}
            <div>
                <h3 className="font-semibold mb-3">Colors</h3>
                <div className="space-y-2">
                    {availableColors.map((color) => (
                        <div
                            key={color}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={`color-${color}`}
                                checked={selectedColors.includes(color)}
                                onCheckedChange={() => handleColorToggle(color)}
                            />
                            <Label
                                htmlFor={`color-${color}`}
                                className="text-sm"
                            >
                                {color}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Sizes */}
            <div>
                <h3 className="font-semibold mb-3">Sizes</h3>
                <div className="space-y-2">
                    {availableSizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                                id={`size-${size}`}
                                checked={selectedSizes.includes(size)}
                                onCheckedChange={() => handleSizeToggle(size)}
                            />
                            <Label htmlFor={`size-${size}`} className="text-sm">
                                {size}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
                <h3 className="font-semibold mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h3>
                <Slider
                    value={priceRange}
                    onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                    }
                    max={maxPrice}
                    step={10}
                    className="w-full"
                />
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) =>
                        setInStockOnly(checked === true)
                    }
                />
                <Label htmlFor="in-stock" className="text-sm">
                    In stock only
                </Label>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                >
                    Clear All Filters ({activeFiltersCount})
                </Button>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Category Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    {categoryId === "apparel" && (
                        <span className="text-3xl">👕</span>
                    )}
                    {categoryId === "footwear" && (
                        <span className="text-3xl">👟</span>
                    )}
                    {categoryId === "accessories" && (
                        <span className="text-3xl">⌚</span>
                    )}
                    {categoryId === "jewellery" && (
                        <span className="text-3xl">💎</span>
                    )}
                </div>
                <h1 className="text-4xl font-bold heading-gradient">
                    {category.name}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {category.subcategories.map((subcategory) => (
                        <Badge
                            key={subcategory}
                            variant="secondary"
                            className="capitalize"
                        >
                            {subcategory.replace("-", " ")}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile Filter Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="sm:hidden">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>
                                    Filter products by your preferences
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6">
                                <FilterContent />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="text-sm text-muted-foreground">
                        {filteredProducts.length} of {allProducts.length}{" "}
                        products
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
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
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="rounded-r-none"
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("list")}
                            className="rounded-l-none"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-8">
                {/* Desktop Filters Sidebar */}
                <div className="hidden sm:block w-80 flex-shrink-0">
                    <div className="sticky top-4">
                        <div className="bg-card border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">
                                    Filters
                                </h2>
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </div>
                            <FilterContent />
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold mb-2">
                                No products found
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Try adjusting your filters to see more results
                            </p>
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                >
                                    Clear All Filters
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    : "space-y-4"
                            }
                        >
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
