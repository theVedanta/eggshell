"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { categories as allCategories } from "@/lib/db";
import { useSearch } from "./useSearch";
import { GSheetProduct } from "@/types/products.type";

interface UseProductFiltersProps {
  productsData?: GSheetProduct[];
  categoriesData?: { id: string; name: string }[];
  initialCategoryId?: string;
  productsPerPage?: number;
  initialSearchQuery?: string;
}

export const useProductFilters = ({
  productsData = [],
  categoriesData = allCategories,
  initialCategoryId,
  productsPerPage: initialProductsPerPage = 12,
  initialSearchQuery = "",
}: UseProductFiltersProps) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategoryId ? [initialCategoryId] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [clothingSizes, setClothingSizes] = useState<string[]>([]);
  const [shoeSizes, setShoeSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Infinite scroll states
  const [displayedCount, setDisplayedCount] = useState(initialProductsPerPage);
  const [productsPerPage] = useState(initialProductsPerPage);

  const productsToFilter = productsData;

  // Use the search hook for filtering and sorting
  const { filteredItems: searchFilteredProducts } = useSearch({
    items: productsToFilter,
    searchQuery,
    searchFields: ["name", "description", "brand", "tags"],
    sortBy: sortBy as any,
    nameField: "name",
    descriptionField: "description",
  });

  // Get unique filter options
  const availableCategories = useMemo(() => {
    return categoriesData.map((cat) => ({ id: cat.id, name: cat.name }));
  }, [categoriesData]);

  const availableBrands = useMemo(() => {
    const brandSet = new Set(productsToFilter.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, [productsToFilter]);

  const availableColors = useMemo(() => {
    const colorSet = new Set(
      productsToFilter.flatMap((p) => p.colors.map((c) => c.productColor))
    );
    return Array.from(colorSet).sort();
  }, [productsToFilter]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set(productsToFilter.flatMap((p) => p.sizes));
    return Array.from(sizeSet).sort();
  }, [productsToFilter]);

  const maxPrice = useMemo(() => {
    if (productsToFilter.length === 0) return 1000; // Default fallback
    const prices = productsToFilter
      .map((p) => p.price)
      .filter((price) => !isNaN(price) && price > 0);
    return prices.length > 0 ? Math.max(...prices) : 1000;
  }, [productsToFilter]);

  // Initialize price range when maxPrice changes
  useEffect(() => {
    if (maxPrice > 0 && priceRange[1] === 1000) {
      setPriceRange([0, maxPrice]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice]); // Remove priceRange from dependencies

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = searchFilteredProducts.filter((product) => {
      // Category filter (only applicable for shop page, not category page)
      if (
        !initialCategoryId && // Only filter by category if on shop page
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
        !product.colors.some((color) =>
          selectedColors.includes(color.productColor)
        )
      ) {
        return false;
      }

      if (
        clothingSizes.length > 0 &&
        !product.sizes.some((size) => clothingSizes.includes(size))
      ) {
        return false;
      }

      if (
        shoeSizes.length > 0 &&
        !product.sizes.some((size) => shoeSizes.includes(size))
      ) {
        return false;
      }

      // Price filter
      const productPrice = Number(product.price);
      const minPrice = Number(priceRange[0]);
      const maxPrice = Number(priceRange[1]);

      if (
        isNaN(productPrice) ||
        productPrice < minPrice ||
        productPrice > maxPrice
      ) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Featured filter (only applicable for shop page)
      if (!initialCategoryId && featuredOnly && !product.featured) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [
    searchFilteredProducts,
    selectedCategories,
    selectedBrands,
    selectedColors,
    clothingSizes,
    shoeSizes,
    priceRange,
    inStockOnly,
    featuredOnly,
    initialCategoryId,
  ]);

  // Infinite scroll logic
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayedCount);
  }, [filteredProducts, displayedCount]);

  const hasNextPage = displayedCount < filteredProducts.length;
  const isLoading = false; // You can add loading state if needed

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setDisplayedCount((prev) =>
        Math.min(prev + productsPerPage, filteredProducts.length)
      );
    }
  }, [hasNextPage, isLoading, productsPerPage, filteredProducts.length]);

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(productsPerPage);
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    selectedColors,
    clothingSizes,
    shoeSizes,
    priceRange,
    inStockOnly,
    featuredOnly,
    productsPerPage,
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
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleClothingSizeToggle = (size: string) => {
    setClothingSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const handleShoeSizeToggle = (size: string) => {
    setShoeSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    if (!initialCategoryId) {
      setSelectedCategories([]);
    }
    setSelectedBrands([]);
    setSelectedColors([]);
    setClothingSizes([]);
    setShoeSizes([]);
    setPriceRange([0, maxPrice]);
    setInStockOnly(false);
    setFeaturedOnly(false);
    setDisplayedCount(productsPerPage); // Reset displayed count on clear
  };

  const activeFiltersCount =
    (initialCategoryId ? 0 : selectedCategories.length) +
    selectedBrands.length +
    selectedColors.length +
    clothingSizes.length +
    shoeSizes.length +
    (inStockOnly ? 1 : 0) +
    (featuredOnly && !initialCategoryId ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return {
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
    availableCategories,
    availableBrands,
    availableColors,
    availableSizes,
    maxPrice,
    filteredProducts,
    displayedProducts,
    hasNextPage,
    isLoading,
    loadMore,
    clearFilters,
    activeFiltersCount,
  };
};
