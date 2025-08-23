import { API_URL } from "@/lib/env";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetSideBarSubcategoriesByCategory(category: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products-subcategories", category],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/sidebar/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products by category");
      }
      const result = await response.json();
      return result.data as string[];
    },
  });
  return { data, error, isLoading };
}

export function usePrefetchSideBarSubcategoriesByCategory() {
  const queryClient = useQueryClient();

  const prefetchSubcategories = (category: string) => {
    queryClient.prefetchQuery({
      queryKey: ["products-subcategories", category],
      queryFn: async () => {
        const response = await fetch(`${API_URL}/sidebar/${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products by category");
        }
        const result = await response.json();
        return result.data as string[];
      },
    });
  };

  return { prefetchSubcategories };
}
