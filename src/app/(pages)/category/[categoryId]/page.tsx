"use client";

import { useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const { categoryId } = params;
  const category = categories.find((cat) => cat.id === categoryId);
  const allProducts = getProductsByCategory(categoryId);

  const {
    searchQuery,
    setSearchQuery,
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
    initialProducts: allProducts,
    initialCategoryId: categoryId,
  });

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
        <h1 className="text-4xl font-bold heading-gradient">{category.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {category.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {category.subcategories.map((subcategory) => (
            <Badge key={subcategory} variant="secondary" className="capitalize">
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
            showCategories={false}
            showFeatured={false}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Products Grid/List */}
        <div className="flex-1">
          {paginatedProducts.length === 0 ? (
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
    </div>
  );
}
