"use client";

import { useState, useMemo } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
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
import { useProductFilters } from "@/hooks/use-product-filters";
import InfiniteScrollTrigger from "@/components/InfiniteScrollTrigger";

export default function CategoryPage() {
  const param = useParams();
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const categoryPath = param.categoryId as string[] | undefined;

  const [categoryId, subcategoryId] = categoryPath || [];

  // Map URL-friendly names to actual category IDs
  const categoryMapping: Record<string, string> = {
    clothing: "apparel",
    shoes: "footwear",
    accessories: "accessories",
    jewelry: "jewellery",
  };

  // Use mapped category ID or fallback to original
  const actualCategoryId = categoryMapping[categoryId] || categoryId;
  const category = categories.find((cat) => cat.id === actualCategoryId);

  // Filter products by category and optionally by subcategory (wrapped in useMemo)
  const allProducts = useMemo(() => {
    let products = actualCategoryId
      ? getProductsByCategory(actualCategoryId)
      : [];

    if (subcategoryId && products.length > 0) {
      products = products.filter(
        (product) => product.subcategory === subcategoryId
      );
    }

    return products;
  }, [actualCategoryId, subcategoryId]);

  // Get unique filter options (moved to top level)
  const availableBrands = useMemo(() => {
    const brandSet = new Set(allProducts.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, [allProducts]);

  const availableColors = useMemo(() => {
    const colorSet = new Set(allProducts.flatMap((p) => p.colors));
    return Array.from(colorSet).sort();
  }, [allProducts]);

  const availableShoeSizes = useMemo(() => {
    const sizeSet = new Set(
      allProducts.flatMap(
        (p) => p.sizes?.filter((s) => /^\d+(\.\d+)?$/.test(s)) || []
      )
    );
    return Array.from(sizeSet).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [allProducts]);
  const availableClothingSizes = useMemo(() => {
    const sizeSet = new Set(
      allProducts.flatMap(
        (p) => p.sizes?.filter((s) => !s.includes("US") && !/\d/.test(s)) || []
      )
    );
    return Array.from(sizeSet).sort();
  }, [allProducts]);
  const {
    searchQuery,
    shoeSizes,
    setSearchQuery,
    selectedBrands,
    handleBrandToggle,
    selectedColors,
    handleColorToggle,
    priceRange,
    setPriceRange,
    inStockOnly,
    hasNextPage,
    isLoading,
    loadMore,
    displayedProducts,
    setInStockOnly,
    sortBy,
    setSortBy,
    maxPrice,
    filteredProducts,
    clearFilters,
    handleClothingSizeToggle,
    handleShoeSizeToggle,
    clothingSizes,
    activeFiltersCount,
  } = useProductFilters({
    initialCategoryId: actualCategoryId,
    initialSearchQuery: urlSearchQuery,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (categoryId && !category) {
    notFound();
  }

  // If no category specified, show category listing
  if (!categoryId) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold heading-gradient">
            Shop by Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="p-6 bg-card rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-muted-foreground mb-4">{cat.description}</p>
              <div className="flex flex-wrap gap-2">
                {cat.subcategories.map((sub) => (
                  <Badge key={sub} variant="secondary" className="capitalize">
                    {sub.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          {categoryId === "apparel" && <span className="text-3xl">👕</span>}
          {categoryId === "footwear" && <span className="text-3xl">👟</span>}
          {categoryId === "accessories" && <span className="text-3xl">⌚</span>}
          {categoryId === "jewellery" && <span className="text-3xl">💎</span>}
        </div>
        <h1 className="text-4xl font-bold heading-gradient">
          {category?.name}
          {subcategoryId && ` - ${subcategoryId.replace("-", " ")}`}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {category?.description}
          {subcategoryId && ` | ${subcategoryId.replace("-", " ")}`}
        </p>

        {!subcategoryId && (
          <div className="flex flex-wrap justify-center gap-2">
            {category?.subcategories.map((subcategory) => (
              <Badge
                key={subcategory}
                variant="secondary"
                className="capitalize"
              >
                {subcategory.replace("-", " ")}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <FilterButton
            showSearch={true}
            showCategories={false}
            showFeatured={false}
            availableClothingSizes={availableClothingSizes}
            availableShoeSizes={availableShoeSizes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            availableBrands={availableBrands}
            selectedBrands={selectedBrands}
            handleBrandToggle={handleBrandToggle}
            availableColors={availableColors}
            selectedColors={selectedColors}
            handleColorToggle={handleColorToggle}
            shoeSizes={shoeSizes}
            handleClothingSizeToggle={handleClothingSizeToggle}
            handleShoeSizeToggle={handleShoeSizeToggle}
            clothingSizes={clothingSizes}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
          />

          <div className="text-sm text-muted-foreground">
            {filteredProducts.length} of {allProducts.length} products
            {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
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
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
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
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No products match your search for "${searchQuery}"`
                  : "Try adjusting your filters to see more results"}
              </p>
              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div
              className={viewMode === "grid" ? "products-grid" : "space-y-4"}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode === "list" ? "compact" : "default"}
                />
              ))}
              <InfiniteScrollTrigger
                hasNextPage={hasNextPage}
                isLoading={isLoading}
                loadMore={loadMore}
                filteredCount={filteredProducts.length}
                displayedCount={displayedProducts.length}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
