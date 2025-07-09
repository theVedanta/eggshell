"use client";

import { useState, useMemo, useEffect } from "react";
import { Grid, List } from "lucide-react";
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
import { categories, Product, products } from "@/lib/db";
import FilterButton from "@/components/FilterButton";
import { useProductFilters } from "@/hooks/use-product-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getSheetProdducts } from "@/lib/get_sheet_prod";

export default async function ShopPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    handleCategoryToggle,
    selectedBrands,
    handleBrandToggle,
    selectedColors,
    handleColorToggle,
    selectedSizes,
    handleSizeToggle,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    featuredOnly,
    setFeaturedOnly,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    productsPerPage,
    maxPrice,
    filteredProducts,
    paginatedProducts,
    totalPages,
    clearFilters,
    activeFiltersCount,
  } = useProductFilters({
    productsData: products,
    categoriesData: categories,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique filter options
  const availableCategories = useMemo(() => {
    return categories.map((cat) => ({ id: cat.id, name: cat.name }));
  }, []);

  const availableBrands = useMemo(() => {
    const brandSet = new Set(products?.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, []);

  const availableColors = useMemo(() => {
    const colorSet = new Set(products?.flatMap((p) => p.colors));
    return Array.from(colorSet).sort();
  }, []);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set(products?.flatMap((p) => p.sizes));
    return Array.from(sizeSet).sort();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold heading-gradient">
          Shop All Products
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our complete collection of modern fashion, footwear,
          accessories, and premium lifestyle products.
        </p>
      </div>

      {/* Quick Category Links */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategories.includes(category.id) ? "default" : "outline"
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
          <FilterButton
            showSearch={true}
            showCategories={true}
            showFeatured={true}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            availableCategories={categories.map((cat) => ({
              id: cat.id,
              name: cat.name,
            }))}
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

          <div className="text-sm text-muted-foreground">
            {filteredProducts.length} of {products?.length} products
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
              <SelectItem value="name">Name A-Z</SelectItem>
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

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}

        {/* Products Grid/List */}
        <div className="flex-1">
          {paginatedProducts.length === 0 ? (
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
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div
              className={viewMode === "grid" ? "products-grid" : "space-y-4"}
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode === "list" ? "compact" : "default"}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Active Filters:</span>
                <div className="flex flex-wrap gap-1">
                  {searchQuery && (
                    <Badge variant="secondary">Search: {searchQuery}</Badge>
                  )}
                  {selectedCategories.map((categoryId) => {
                    const category = categories.find(
                      (c) => c.id === categoryId
                    );
                    return (
                      <Badge key={categoryId} variant="secondary">
                        {category?.name}
                      </Badge>
                    );
                  })}
                  {selectedBrands.map((brand) => (
                    <Badge key={brand} variant="secondary">
                      {brand}
                    </Badge>
                  ))}
                  {inStockOnly && <Badge variant="secondary">In Stock</Badge>}
                  {featuredOnly && <Badge variant="secondary">Featured</Badge>}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
