"use client";

import { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/lib/db";
import FilterButton from "@/components/FilterButton";
import { useProductFilters } from "@/hooks/use-product-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

import { products } from "@/lib/products";

export default function StorePage() {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";

  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    handleCategoryToggle,
    selectedBrands,
    handleBrandToggle,
    selectedColors,
    handleColorToggle,
    clothingSizes,
    shoeSizes,
    handleClothingSizeToggle,
    handleShoeSizeToggle,
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
    maxPrice,
    filteredProducts,
    paginatedProducts,
    totalPages,
    clearFilters,
    activeFiltersCount,
  } = useProductFilters({
    productsData: products,
    categoriesData: categories,
    initialSearchQuery: urlSearchQuery,
  });

  // Sync URL search param with internal search state
  useEffect(() => {
    if (urlSearchQuery !== searchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery, searchQuery, setSearchQuery]);

  const availableBrands = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, []);

  const availableColors = useMemo(() => {
    const colorSet = new Set(products.flatMap((p) => p.colors || {}));
    return Array.from(colorSet).sort();
  }, []);

  const availableShoeSizes = useMemo(() => {
    const sizeSet = new Set(
      products.flatMap(
        (p) => p.sizes?.filter((s) => /^\d+(\.\d+)?$/.test(s)) || []
      )
    );
    return Array.from(sizeSet).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, []);
  const availableClothingSizes = useMemo(() => {
    const sizeSet = new Set(
      products.flatMap(
        (p) => p.sizes?.filter((s) => !s.includes("US") && !/\d/.test(s)) || []
      )
    );
    return Array.from(sizeSet).sort();
  }, []);
  return (
    <div className="space-y-6 md:px-5 px-2 mb-7">
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
            availableShoeSizes={availableShoeSizes}
            availableClothingSizes={availableClothingSizes}
            clothingSizes={clothingSizes}
            shoeSizes={shoeSizes}
            handleClothingSizeToggle={handleClothingSizeToggle}
            handleShoeSizeToggle={handleShoeSizeToggle}
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
            {filteredProducts.length} of {products.length} products
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        {paginatedProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
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
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
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
  );
}
