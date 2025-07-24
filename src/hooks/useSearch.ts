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
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    type R = { item: T; score: number; onlyDesc: boolean };

    const results: R[] = items.map((item) => {
      let score = 0;
      const matchedFields: string[] = [];
      let descMatched = false;

      const matchText = (field: keyof T, value: string, base: number) => {
        const val = value.toLowerCase();
        if (val.includes(query)) {
          let s = base;
          if (val === query) s *= 1.5;
          else if (val.startsWith(query)) s *= 1.25;
          score += s;
          matchedFields.push(field as string);
          if (field === descriptionField) descMatched = true;
        }
      };

      if (item.category) matchText("category", item.category, 200);
      if (item.subcategory) matchText("subcategory", item.subcategory, 180);
      if (item.name) matchText("name", item.name, 150);
      if (item.brand) matchText("brand", item.brand, 80);
      if (item.tags)
        item.tags.forEach(
          (tag) => typeof tag === "string" && matchText("tags", tag, 60)
        );
      if (item.description) matchText("description", item.description, 50);
      searchFields.forEach((field) => {
        const val = item[field];
        if (typeof val === "string") matchText(field, val, 25);
        else if (Array.isArray(val))
          val.forEach(
            (v: any) => typeof v === "string" && matchText(field, v, 15)
          );
      });

      const onlyDesc =
        descMatched &&
        matchedFields.length === 1 &&
        matchedFields[0] === "description";
      return { item, score, onlyDesc };
    });

    // Separate
    const main = results.filter((r) => !r.onlyDesc && r.score > 0);
    const descOnly = results.filter((r) => r.onlyDesc && r.score > 0);

    // Sort main by score desc
    main.sort((a, b) => b.score - a.score);

    // Optional within-group sorting
    const sortWithin = (arr: R[]) => {
      const [field, dir] = sortBy.split("-") as [string, string];
      if (field === "name" || field === "description") {
        arr.sort((a, b) => {
          const va = (a.item[field as keyof T] as string) || "";
          const vb = (b.item[field as keyof T] as string) || "";
          return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
        });
      }
    };
    sortWithin(main);
    // We *do not* sort descOnly—they stay in original order

    return [...main.map((r) => r.item), ...descOnly.map((r) => r.item)];
  }, [items, searchQuery, searchFields, sortBy, descriptionField]);

  return {
    filteredItems: filteredAndSortedItems,
    totalCount: filteredAndSortedItems.length,
    originalCount: items.length,
    hasSearchQuery: searchQuery.trim().length > 0,
  };
}
