"use client";

import { useState, useMemo } from "react";
import { Filter, Grid, List, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { products, categories, brands, Product } from "@/lib/db";
import { FilterContent } from "@/components/FilterContent";

export default function ShopPage() {
    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Get unique filter options
    const availableCategories = useMemo(() => {
        return categories.map((cat) => ({ id: cat.id, name: cat.name }));
    }, []);

    const availableBrands = useMemo(() => {
        const brandSet = new Set(products.map((p) => p.brand));
        return Array.from(brandSet).sort();
    }, []);

    const availableColors = useMemo(() => {
        const colorSet = new Set(products.flatMap((p) => p.colors));
        return Array.from(colorSet).sort();
    }, []);

    const availableSizes = useMemo(() => {
        const sizeSet = new Set(products.flatMap((p) => p.sizes));
        return Array.from(sizeSet).sort();
    }, []);

    const maxPrice = useMemo(() => {
        return Math.max(...products.map((p) => p.originalPrice || p.price));
    }, []);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            // Search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query) ||
                    product.tags.some((tag) =>
                        tag.toLowerCase().includes(query)
                    );

                if (!matchesSearch) return false;
            }

            // Category filter
            if (
                selectedCategories.length > 0 &&
                !selectedCategories.includes(product.category)
            ) {
                return false;
            }

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

            // Featured filter
            if (featuredOnly && !product.featured) {
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
                filtered.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return a.name.localeCompare(b.name);
                });
                break;
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
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
        searchQuery,
        selectedCategories,
        selectedBrands,
        selectedColors,
        selectedSizes,
        priceRange,
        inStockOnly,
        featuredOnly,
        sortBy,
    ]);

    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((c) => c !== categoryId)
                : [...prev, categoryId]
        );
    };

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
        setSearchQuery("");
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setPriceRange([0, maxPrice]);
        setInStockOnly(false);
        setFeaturedOnly(false);
    };

    const activeFiltersCount =
        selectedCategories.length +
        selectedBrands.length +
        selectedColors.length +
        selectedSizes.length +
        (inStockOnly ? 1 : 0) +
        (featuredOnly ? 1 : 0) +
        (searchQuery ? 1 : 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold heading-gradient">
                    Shop All Products
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Discover our complete collection of modern fashion,
                    footwear, accessories, and premium lifestyle products.
                </p>
            </div>

            {/* Quick Category Links */}
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={
                            selectedCategories.includes(category.id)
                                ? "default"
                                : "outline"
                        }
                        size="sm"
                        onClick={() => handleCategoryToggle(category.id)}
                        className="capitalize"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile Filter Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="px-6 flex flex-col max-h-screen"
                        >
                            <div className="mt-6 flex-1 overflow-y-auto">
                                <FilterContent
                                    showSearch={true}
                                    showCategories={true}
                                    showFeatured={true}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    availableCategories={availableCategories}
                                    selectedCategories={selectedCategories}
                                    handleCategoryToggle={handleCategoryToggle}
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
                                    featuredOnly={featuredOnly}
                                    setFeaturedOnly={setFeaturedOnly}
                                    activeFiltersCount={activeFiltersCount}
                                    clearFilters={clearFilters}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="text-sm text-muted-foreground">
                        {filteredProducts.length} of {products.length} products
                        {searchQuery && <span> matching "{searchQuery}"</span>}
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
                            <SelectItem value="name">Name A-Z</SelectItem>
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

            <div className="flex gap-6">
                {/* Desktop Filters Sidebar */}

                {/* Products Grid/List */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold mb-2">
                                    No products found
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {searchQuery
                                        ? `No products match your search for "${searchQuery}"`
                                        : "Try adjusting your filters or search criteria"}
                                </p>
                                {activeFiltersCount > 0 && (
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                    >
                                        Clear All Filters
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
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
                                    variant={
                                        viewMode === "list"
                                            ? "compact"
                                            : "default"
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">
                                    Active Filters:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {searchQuery && (
                                        <Badge variant="secondary">
                                            Search: {searchQuery}
                                        </Badge>
                                    )}
                                    {selectedCategories.map((categoryId) => {
                                        const category = categories.find(
                                            (c) => c.id === categoryId
                                        );
                                        return (
                                            <Badge
                                                key={categoryId}
                                                variant="secondary"
                                            >
                                                {category?.name}
                                            </Badge>
                                        );
                                    })}
                                    {selectedBrands.map((brand) => (
                                        <Badge key={brand} variant="secondary">
                                            {brand}
                                        </Badge>
                                    ))}
                                    {inStockOnly && (
                                        <Badge variant="secondary">
                                            In Stock
                                        </Badge>
                                    )}
                                    {featuredOnly && (
                                        <Badge variant="secondary">
                                            Featured
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                            >
                                Clear All
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
