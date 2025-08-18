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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/lib/db";
import FilterButton from "@/components/FilterButton";
import { useProductFilters } from "@/hooks/use-product-filters";

import { useGetAllProducts } from "@/query-calls/product-query";
import InfiniteScrollTrigger from "../InfiniteScrollTrigger";

export default function StorePage() {
  const { data: products, error, isLoading: l } = useGetAllProducts();
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
    maxPrice,
    filteredProducts,
    displayedProducts,
    hasNextPage,
    isLoading,
    loadMore,
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
    const brandSet = new Set(products?.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, [products]);

  const availableColors = useMemo(() => {
    const colorSet = new Set(
      products?.flatMap((p) => p.colors.map((c) => c.productColor) || [])
    );
    return Array.from(colorSet).sort();
  }, [products]);

  const availableShoeSizes = useMemo(() => {
    const sizeSet = new Set(
      products?.flatMap(
        (p) => p.sizes?.filter((s) => /^\d+(\.\d+)?$/.test(s)) || []
      )
    );
    return Array.from(sizeSet).sort(
      (a, b) => Number.parseFloat(a) - Number.parseFloat(b)
    );
  }, [products]);
  const availableClothingSizes = useMemo(() => {
    const sizeSet = new Set(
      products?.flatMap(
        (p) => p.sizes?.filter((s) => !s.includes("US") && !/\d/.test(s)) || []
      )
    );
    return Array.from(sizeSet).sort();
  }, [products]);
  return (
    <div className="space-y-4 mb-7">
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
            {filteredProducts.length} of {products?.length} products
            {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Products Grid */}
      <div className="w-full max-w-full overflow-hidden">
        {displayedProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No products match your search for "${searchQuery}"`
                  : "Try adjusting your filters or search criteria"}
              </p>
              {activeFiltersCount > 0 && clearFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-full overflow-hidden pb-10">
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: false,
                dragFree: false,
                containScroll: "trimSnaps",
              }}
              className="w-full select-none"
            >
              <CarouselContent className="ml-0">
                {displayedProducts.map((product, index) => (
                  <CarouselItem
                    key={`${product.id}-${index}`}
                    className="basis-[calc(50%-6px)] sm:basis-[calc(33.333%-8px)] md:basis-[calc(25%-9px)] lg:basis-[calc(25%-9px)] min-w-0 flex-shrink-0"
                  >
                    <div className="w-full h-full">
                      {/* <p>Hello</p> */}
                      <ProductCard
                        product={product}
                        className="w-full max-w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
                <InfiniteScrollTrigger
                  hasNextPage={hasNextPage}
                  isLoading={isLoading}
                  loadMore={loadMore}
                  filteredCount={filteredProducts.length}
                  displayedCount={displayedProducts.length}
                />
              </CarouselContent>
              <div className="md:block hidden">
                <CarouselPrevious className="absolute left-0 z-10 top-[100%] m-5 w-[100px] rounded-sm" />
                <CarouselNext className="absolute right-0 z-10 top-[100%] m-5 w-[100px] rounded-sm" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
