"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { Grid, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/ProductCard";
import { categories, getProductsByCategory } from "@/lib/db";
import FilterButton from "@/components/FilterButton";

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
    const [searchQuery, setSearchQuery] = useState("");

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
                    <FilterButton
                        showSearch={true}
                        showCategories={true}
                        showFeatured={true}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        availableBrands={availableBrands}
                        selectedBrands={selectedBrands}
                        handleBrandToggle={handleBrandToggle}
                        availableColors={availableColors}
                        selectedColors={selectedColors}
                        handleColorToggle={handleColorToggle}
                        availableSizes={availableSizes}
                        selectedSizes={selectedSizes}
                        handleSizeToggle={handleSizeToggle}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        maxPrice={maxPrice}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                        activeFiltersCount={activeFiltersCount}
                        clearFilters={clearFilters}
                    />

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
                                    ? "products-grid"
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
