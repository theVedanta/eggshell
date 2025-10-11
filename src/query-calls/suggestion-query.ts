import { API_URL } from "@/lib/env";
import { UserLikingType } from "@/lib/redis";
import { GSheetProduct } from "@/types/products.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ProdInfoType {
  category: string;
  subCategory: string;
}
export function useSetProdQue() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["prod-que"],
    mutationFn: async (prodInfo: ProdInfoType) => {
      const res = await fetch(API_URL + "/suggestion", {
        method: "POST",
        body: JSON.stringify(prodInfo),
      });
      if (!res.ok) {
        throw Error("Something went wrong !!");
      }
      return { isDone: true };
    },
  });
  return {
    mutate,
    isPending,
  };
}

export function useGetAlluserLiking() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-liking"],
    queryFn: async (): Promise<UserLikingType> => {
      const res = await fetch(API_URL + "/suggestion");
      if (!res.ok) {
        throw Error("Something went wrong !!");
      }
      return res.json() as Promise<UserLikingType>;
    },
  });
  return { data, isLoading, error };
}

export function useGetAllProductsByLiking() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products-by-liking"],
    queryFn: async (): Promise<{
      highestPriority: any;
      filteredProducts: any[];
    }> => {
      const res = await fetch(API_URL + "/suggestion/prods");
      if (!res.ok) {
        return null as any;
      }
      return res.json() as Promise<{
        highestPriority: any;
        filteredProducts: GSheetProduct[];
      }>;
    },
  });
  return { data, isLoading, error };
}
