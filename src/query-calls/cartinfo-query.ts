import { API_URL } from "@/lib/env";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "@/lib/types";

export function useGetAllCartItems(userId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-cart-items", userId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/cartinfo?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const result = await response.json();
      return result.data as CartItem[];
    },
    enabled: !!userId, // Only run if userId exists
  });
  return { data, error, isLoading };
}

// Create a new cart item
export function useStoreCartInfo(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: CartItem) => {
      const response = await fetch(`${API_URL}/cartinfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, userId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create cart item");
      }
      const result = await response.json();
      return result.data as CartItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-cart-items", userId] });
    },
  });
}

// Update cart item
export function useUpdateCartItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: Partial<CartItem> & { id: string }) => {
      const response = await fetch(`${API_URL}/cartinfo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId, ...updateData }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
      const result = await response.json();
      return result.data as CartItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-cart-items", userId] });
    },
  });
}

// Delete cart item
export function useDeleteCartItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(
        `${API_URL}/cartinfo?id=${itemId}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete cart item");
      }
      return itemId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-cart-items", userId] });
    },
  });
}

// Clear all cart items for a user
export function useClearCart(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // First get all cart items
      const response = await fetch(`${API_URL}/cartinfo?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const result = await response.json();
      const cartItems = result.data as CartItem[];

      // Delete each item
      const deletePromises = cartItems.map((item) =>
        fetch(`${API_URL}/cartinfo?id=${item.id}&userId=${userId}`, {
          method: "DELETE",
        })
      );

      await Promise.all(deletePromises);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-cart-items", userId] });
    },
  });
}
