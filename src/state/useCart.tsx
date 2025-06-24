"use client";

import { CartItem, CartState } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore extends CartState {
    addToCart: (
        item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }
    ) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
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

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            addToCart: (item) => {
                const id = `${item.productId}-${item.color}-${item.size}`;
                const existing = get().items.find(
                    (i) =>
                        i.productId === item.productId &&
                        i.color === item.color &&
                        i.size === item.size
                );
                let items;
                if (existing) {
                    items = get().items.map((i) =>
                        i.productId === item.productId &&
                        i.color === item.color &&
                        i.size === item.size
                            ? {
                                  ...i,
                                  quantity: i.quantity + (item.quantity || 1),
                              }
                            : i
                    );
                } else {
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
            removeFromCart: (itemId) => {
                const items = get().items.filter((item) => item.id !== itemId);
                const { total, itemCount } = recalculate(items);
                set({ items, total, itemCount });
                toast.success("Removed from cart");
            },
            updateQuantity: (itemId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(itemId);
                    return;
                }
                const items = get().items.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                );
                const { total, itemCount } = recalculate(items);
                set({ items, total, itemCount });
            },
            clearCart: () => {
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
