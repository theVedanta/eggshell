"use client";

import { useState, useMemo, useEffect } from "react";
import { OldProduct, categories as allCategories } from "@/lib/db";
import { useSearch } from "./useSearch";
import { products as allProductsData } from "@/lib/products";

interface UseProductFiltersProps {
  initialProducts?: OldProduct[];
  productsData?: OldProduct[];
  categoriesData?: { id: string; name: string }[];
  initialCategoryId?: string;
  productsPerPage?: number;
  initialSearchQuery?: string;
}

export const useProductFilters = ({
  initialProducts,
  productsData = allProductsData,
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
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(
    initialProductsPerPage
  );

  const productsToFilter = initialProducts || productsData;

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
    const colorSet = new Set(productsToFilter.flatMap((p) => p.colors));
    return Array.from(colorSet).sort();
  }, [productsToFilter]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set(productsToFilter.flatMap((p) => p.sizes));
    return Array.from(sizeSet).sort();
  }, [productsToFilter]);

  const maxPrice = useMemo(() => {
    return Math.max(...productsToFilter.map((p) => p.originalPrice || p.price));
  }, [productsToFilter]);

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
    selectedSizes,
    priceRange,
    inStockOnly,
    featuredOnly,
    initialCategoryId,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  // Reset pagination only when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
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
    setSelectedSizes([]);
    setPriceRange([0, maxPrice]);
    setInStockOnly(false);
    setFeaturedOnly(false);
    setCurrentPage(1); // Reset pagination on clear
  };

  const activeFiltersCount =
    (initialCategoryId ? 0 : selectedCategories.length) +
    selectedBrands.length +
    selectedColors.length +
    selectedSizes.length +
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
    setProductsPerPage,
    availableCategories,
    availableBrands,
    availableColors,
    availableSizes,
    maxPrice,
    filteredProducts,
    paginatedProducts,
    totalPages,
    clearFilters,
    activeFiltersCount,
  };
};
