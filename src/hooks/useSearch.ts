"use client";
import { useMemo } from "react";

type SortOption =
  | "name-asc"
  | "name-desc"
  | "description-asc"
  | "description-desc";

interface SearchableItem {
  [key: string]: any;
  category?: string;
  subcategory?: string;
  name?: string;
  description?: string;
  brand?: string;
  tags?: string[];
  featured?: boolean;
  price?: number;
  rating?: number;
}

export function useSearch<T extends SearchableItem>({
  items,
  searchQuery = "",
  searchFields = [],
  sortBy = "name-asc",
  nameField = "name",
  descriptionField = "description",
}: {
  items: T[];
  searchQuery?: string;
  searchFields?: (keyof T)[];
  sortBy?: SortOption;
  nameField?: keyof T;
  descriptionField?: keyof T;
}) {
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    // Search filter with scoring for relevance - focus on category, subcategory, name, description, brand, tags
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchResults = filtered.map((item) => {
        let relevanceScore = 0;
        let hasMatch = false;

        // Search in category (highest priority)
        if (item.category && typeof item.category === "string") {
          const categoryValue = item.category.toLowerCase();
          if (categoryValue.includes(query)) {
            hasMatch = true;
            if (categoryValue === query) {
              relevanceScore += 200;
            } else if (categoryValue.startsWith(query)) {
              relevanceScore += 150;
            } else {
              relevanceScore += 100;
            }
          }
        }

        // Search in subcategory (very high priority) - for shoes, sneakers, t-shirts, etc.
        if (item.subcategory && typeof item.subcategory === "string") {
          const subcategoryValue = item.subcategory.toLowerCase();

          // Use category to determine footwear vs apparel matches
          const isFootwearCategory = item.category === "footwear";
          const isApparelCategory = item.category === "apparel";

          // Handle variations like "shoes" matching any footwear subcategory
          const isShoeMatch = query.includes("shoe") && isFootwearCategory;

          // Handle variations like "shirt" matching apparel subcategories
          const isShirtMatch =
            query.includes("shirt") &&
            isApparelCategory &&
            (subcategoryValue.includes("t-shirt") ||
              subcategoryValue.includes("polo"));

          if (subcategoryValue.includes(query) || isShoeMatch || isShirtMatch) {
            hasMatch = true;
            if (subcategoryValue === query || isShoeMatch || isShirtMatch) {
              relevanceScore += 180;
            } else if (subcategoryValue.startsWith(query)) {
              relevanceScore += 140;
            } else {
              relevanceScore += 120;
            }
          }
        }

        // Search in name (high priority)
        if (item.name && typeof item.name === "string") {
          const nameValue = item.name.toLowerCase();
          if (nameValue.includes(query)) {
            hasMatch = true;
            if (nameValue === query) {
              relevanceScore += 150; // Exact name match
            } else if (nameValue.startsWith(query)) {
              relevanceScore += 100;
            } else {
              relevanceScore += 75;
            }
          }
        }

        // Search in brand (medium-high priority)
        if (item.brand && typeof item.brand === "string") {
          const brandValue = item.brand.toLowerCase();
          if (brandValue.includes(query)) {
            hasMatch = true;
            relevanceScore += 80;
          }
        }

        // Search in tags (medium priority)
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach((tag: string) => {
            if (typeof tag === "string" && tag.toLowerCase().includes(query)) {
              hasMatch = true;
              relevanceScore += 60;
            }
          });
        }

        // Search in description (medium priority)
        if (item.description && typeof item.description === "string") {
          const descriptionValue = item.description.toLowerCase();
          if (descriptionValue.includes(query)) {
            hasMatch = true;
            relevanceScore += 50;
          }
        }

        // Search in other specified fields (lower priority)
        searchFields.forEach((field) => {
          const value = item[field];
          if (typeof value === "string") {
            const fieldValue = value.toLowerCase();
            if (fieldValue.includes(query)) {
              hasMatch = true;
              relevanceScore += 25;
            }
          }
          if (Array.isArray(value)) {
            value.forEach((v: any) => {
              if (typeof v === "string" && v.toLowerCase().includes(query)) {
                hasMatch = true;
                relevanceScore += 15;
              }
            });
          }
        });

        return { item, relevanceScore, hasMatch };
      });

      filtered = searchResults
        .filter((result) => result.hasMatch)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .map((result) => result.item);
    }

    return filtered;
  }, [items, searchQuery, searchFields]);

  return {
    filteredItems: filteredAndSortedItems,
    totalCount: filteredAndSortedItems.length,
    originalCount: items.length,
    hasSearchQuery: searchQuery.trim().length > 0,
  };
}
