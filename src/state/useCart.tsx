"use client";

import { CartItem, CartState } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  useGetAllCartItems,
  useStoreCartInfo,
  useUpdateCartItem,
  useDeleteCartItem,
  useClearCart,
} from "@/query-calls/cartinfo-query";
import { useEffect } from "react";

interface CartStore extends CartState {
  addToCart: (
    item: Omit<CartItem, "id" | "quantity"> & { quantity?: number },
    userId?: string
  ) => Promise<void>;
  removeFromCart: (itemId: string, userId?: string) => Promise<void>;
  updateQuantity: (
    itemId: string,
    quantity: number,
    userId?: string
  ) => Promise<void>;
  clearCart: (userId?: string) => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  syncWithDB: (dbItems: CartItem[]) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function recalculate(items: CartItem[]) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

// Generate a random ID for cart items
function generateCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      syncWithDB: (dbItems) => {
        // Merge items with same product/color/size combination
        const mergedItems: CartItem[] = [];

        dbItems.forEach((dbItem) => {
          const existingIndex = mergedItems.findIndex(
            (item) =>
              item.productId === dbItem.productId &&
              item.selectedColor === dbItem.selectedColor &&
              item.size === dbItem.size
          );

          if (existingIndex >= 0) {
            // Merge quantities for same items
            mergedItems[existingIndex].quantity += dbItem.quantity;
          } else {
            // Add new item with a consistent local ID format
            const localId = `${dbItem.productId}-${dbItem.selectedColor}-${dbItem.size}`;
            mergedItems.push({
              ...dbItem,
              id: localId,
            });
          }
        });

        const { total, itemCount } = recalculate(mergedItems);
        set({ items: mergedItems, total, itemCount, isLoading: false });
      },

      addToCart: async (item, userId) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.selectedColor === item.selectedColor &&
            i.size === item.size
        );
        let items;
        if (existing) {
          items = get().items.map((i) =>
            i.productId === item.productId &&
            i.selectedColor === item.selectedColor &&
            i.size === item.size
              ? {
                  ...i,
                  quantity: i.quantity + (item.quantity || 1),
                }
              : i
          );
        } else {
          const id = generateCartItemId();
          items = [
            ...get().items,
            {
              ...item,
              id,
              quantity: item.quantity || 1,
            },
          ];
        }
        const { total, itemCount } = recalculate(items);
        set({ items, total, itemCount });
        toast.success("Added to cart!");
      },

      removeFromCart: async (itemId, userId) => {
        const items = get().items.filter((item) => item.id !== itemId);
        const { total, itemCount } = recalculate(items);
        set({ items, total, itemCount });
        toast.success("Removed from cart");
      },

      updateQuantity: async (itemId, quantity, userId) => {
        if (quantity <= 0) {
          await get().removeFromCart(itemId, userId);
          return;
        }
        const items = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const { total, itemCount } = recalculate(items);
        set({ items, total, itemCount });
      },

      clearCart: async (userId) => {
        set({ items: [], total: 0, itemCount: 0 });
        toast.success("Cart cleared");
      },

      getCartTotal: () => get().total,
      getCartItemCount: () => get().itemCount,
    }),
    {
      name: "cart",
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        total: state.total,
      }),
    }
  )
);

// Wrapper hook that integrates with database
export function useCart(userId?: string) {
  const cartStore = useCartStore();
  const { data: dbCartItems, isLoading: dbLoading } = useGetAllCartItems(
    userId || ""
  );
  const storeCartMutation = useStoreCartInfo(userId || "");
  const updateCartMutation = useUpdateCartItem(userId || "");
  const deleteCartMutation = useDeleteCartItem(userId || "");
  const clearCartMutation = useClearCart(userId || "");

  // Get stable references to avoid recreating on every render
  const syncWithDB = useCartStore((state) => state.syncWithDB);
  const setLoading = useCartStore((state) => state.setLoading);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const removeFromCartStore = useCartStore((state) => state.removeFromCart);
  const updateQuantityStore = useCartStore((state) => state.updateQuantity);
  const clearCartStore = useCartStore((state) => state.clearCart);

  // Sync with database when data is loaded
  useEffect(() => {
    if (userId && dbCartItems && !dbLoading) {
      syncWithDB(dbCartItems);
    }
  }, [dbCartItems, dbLoading, userId, syncWithDB]);

  // Set loading state
  useEffect(() => {
    // Only set loading from DB if user is logged in, otherwise always false
    setLoading(userId ? dbLoading : false);
  }, [dbLoading, setLoading, userId]);

  const addToCart = async (
    item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }
  ) => {
    // Update local state first for immediate UI feedback
    await addToCartStore(item, userId);

    // Store in database if user is logged in
    if (userId) {
      try {
        // Get the updated item from local store
        const updatedItems = useCartStore.getState().items;
        const updatedItem = updatedItems.find(
          (i) =>
            i.productId === item.productId &&
            i.selectedColor === item.selectedColor &&
            i.size === item.size
        );

        if (updatedItem) {
          // Check if this item already exists in the database
          const existingDbItem = dbCartItems?.find(
            (dbItem) =>
              dbItem.productId === item.productId &&
              dbItem.selectedColor === item.selectedColor &&
              dbItem.size === item.size
          );

          if (existingDbItem) {
            // Update existing database item with the new quantity
            await updateCartMutation.mutateAsync({
              id: existingDbItem.id,
              quantity: updatedItem.quantity,
            });
          } else {
            // Create new database item
            await storeCartMutation.mutateAsync(updatedItem);
          }
        }
      } catch (error) {
        console.error("Failed to store cart item in DB:", error);
        toast.error("Failed to sync with database");
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    // Find the item being removed to get its database ID
    const itemToRemove = cartStore.items.find((item) => item.id === itemId);

    // Update local state first for immediate UI feedback
    await removeFromCartStore(itemId, userId);

    // Remove from database if user is logged in
    if (userId && itemToRemove) {
      try {
        // Find the corresponding database item
        const dbItem = dbCartItems?.find(
          (dbItem) =>
            dbItem.productId === itemToRemove.productId &&
            dbItem.selectedColor === itemToRemove.selectedColor &&
            dbItem.size === itemToRemove.size
        );

        if (dbItem) {
          await deleteCartMutation.mutateAsync(dbItem.id);
        }
      } catch (error) {
        console.error("Failed to remove cart item from DB:", error);
        toast.error("Failed to sync with database");
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    // Find the item being updated to get its database ID
    const itemToUpdate = cartStore.items.find((item) => item.id === itemId);

    // Update local state first for immediate UI feedback
    await updateQuantityStore(itemId, quantity, userId);

    // Update in database if user is logged in
    if (userId && itemToUpdate) {
      try {
        // Find the corresponding database item
        const dbItem = dbCartItems?.find(
          (dbItem) =>
            dbItem.productId === itemToUpdate.productId &&
            dbItem.selectedColor === itemToUpdate.selectedColor &&
            dbItem.size === itemToUpdate.size
        );

        if (dbItem) {
          if (quantity <= 0) {
            await deleteCartMutation.mutateAsync(dbItem.id);
          } else {
            await updateCartMutation.mutateAsync({ id: dbItem.id, quantity });
          }
        }
      } catch (error) {
        console.error("Failed to update cart item in DB:", error);
        toast.error("Failed to sync with database");
      }
    }
  };

  const clearCart = async () => {
    // Update local state first for immediate UI feedback
    await clearCartStore(userId);

    // Clear from database if user is logged in
    if (userId) {
      try {
        await clearCartMutation.mutateAsync();
      } catch (error) {
        console.error("Failed to clear cart from DB:", error);
        toast.error("Failed to sync with database");
      }
    }
  };

  return {
    items: cartStore.items,
    total: cartStore.total,
    itemCount: cartStore.itemCount,
    isLoading: userId
      ? cartStore.isLoading ||
        storeCartMutation.isPending ||
        updateCartMutation.isPending ||
        deleteCartMutation.isPending ||
        clearCartMutation.isPending
      : false,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal: useCartStore.getState().getCartTotal,
    getCartItemCount: useCartStore.getState().getCartItemCount,
  };
}
