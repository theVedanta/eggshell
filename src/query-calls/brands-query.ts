import { API_URL } from "@/lib/env";
import { Brand } from "@/types/brand.type";
import { useQuery } from "@tanstack/react-query";

export function useGetAllBrands() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-brands"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/brands`);
      if (!response.ok) {
        throw new Error("Failed to fetch products by brand");
      }
      const result = await response.json();
      return result.data as Brand[];
    },
  });
  return { data, error, isLoading };
}
