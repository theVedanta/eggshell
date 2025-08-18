import { API_URL } from "@/lib/env";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CheckoutForm } from "@/app/(pages)/checkout/page";
import { CartItem } from "@/lib/types";

// Type for the order, based on CheckoutForm
export interface Order extends CheckoutForm {
  id?: string;
  items?: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Fetch all orders
export function useGetAllOrders(id?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-orders", id],
    queryFn: async () => {
      if (id) {
        const response = await fetch(`${API_URL}/order?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        return [result.data] as Order[]; // Wrap single order in array
      } else {
        const response = await fetch(`${API_URL}/order`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        return result.data as Order[];
      }
    },
  });
  return { data, error, isLoading };
}

// Create a new order
export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      order: CheckoutForm | { items: CartItem[]; total: number }
    ) => {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      const result = await response.json();
      return result.data as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
  });
}
