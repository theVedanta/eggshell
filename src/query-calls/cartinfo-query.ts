import { API_URL } from "@/lib/env";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CheckoutForm } from "@/app/(pages)/checkout/page";
import { CartItem } from "@/lib/types";

export function useGetAllCartItems() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-cart-items"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/cartinfo`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const result = await response.json();
      return result.data as CartItem[];
    },
  });
  return { data, error, isLoading };
}

// Create a new order
export function useStoreCartIInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: CartItem) => {
      const response = await fetch(`${API_URL}/cartinfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      const result = await response.json();
      return result.data as { id: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
  });
}
