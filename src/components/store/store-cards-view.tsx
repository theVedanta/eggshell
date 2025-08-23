"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { GSheetProduct } from "@/types/products.type";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useEffect, useMemo } from "react";
import FilterButton from "../FilterButton";
import { categories } from "@/lib/db";
import StorePage from "./store-page";

interface StoreCardsViewProps {
  FootwearProducts?: GSheetProduct[];
  ApparelProducts?: GSheetProduct[];
  AccessoriesProducts?: GSheetProduct[];
  isFootwearLoading: boolean;
  isApparelLoading: boolean;
  isAccessoriesLoading: boolean;
}

export default function StoreCardsView({
  FootwearProducts,
  ApparelProducts,
  AccessoriesProducts,
  isFootwearLoading,
  isApparelLoading,
  isAccessoriesLoading,
}: StoreCardsViewProps) {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";

  const products = useMemo(() => {
    if (!AccessoriesProducts || !ApparelProducts || !FootwearProducts)
      return [];
    return [...AccessoriesProducts, ...ApparelProducts, ...FootwearProducts];
  }, [AccessoriesProducts, ApparelProducts, FootwearProducts]);

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

  const filteredFootwearProducts = useMemo(() => {
    return filteredProducts.filter((product) =>
      FootwearProducts?.some((fp) => fp.id === product.id)
    );
  }, [filteredProducts, FootwearProducts]);

  const filteredApparelProducts = useMemo(() => {
    return filteredProducts.filter((product) =>
      ApparelProducts?.some((ap) => ap.id === product.id)
    );
  }, [filteredProducts, ApparelProducts]);

  const filteredAccessoriesProducts = useMemo(() => {
    return filteredProducts.filter((product) =>
      AccessoriesProducts?.some((acp) => acp.id === product.id)
    );
  }, [filteredProducts, AccessoriesProducts]);

  if (!AccessoriesProducts || !ApparelProducts || !FootwearProducts) {
    return null;
  }

  return (
    <div className="gflex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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

      <>
        {filteredFootwearProducts.length > 0 && (
          <StorePage
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            displayedProducts={filteredFootwearProducts}
            filteredProducts={filteredFootwearProducts}
            loadMore={loadMore}
            searchQuery={searchQuery}
            hasNextPage={hasNextPage}
            prodType="Footwear"
            isLoading={isFootwearLoading}
          />
        )}
        {filteredApparelProducts.length > 0 && (
          <StorePage
            hasNextPage={hasNextPage}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            displayedProducts={filteredApparelProducts}
            filteredProducts={filteredApparelProducts}
            loadMore={loadMore}
            prodType="Apparel"
            searchQuery={searchQuery}
            isLoading={isApparelLoading}
          />
        )}
        {filteredAccessoriesProducts.length > 0 && (
          <StorePage
            hasNextPage={hasNextPage}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            displayedProducts={filteredAccessoriesProducts}
            filteredProducts={filteredAccessoriesProducts}
            loadMore={loadMore}
            prodType="Accessories"
            searchQuery={searchQuery}
            isLoading={isAccessoriesLoading}
          />
        )}
      </>
    </div>
  );
}
