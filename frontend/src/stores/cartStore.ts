import { defineStore } from "pinia";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    total(state): number {
      return state.items.reduce(
        (acc, item) => acc + item.product.price_cents * item.quantity,
        0
      );
    },
    itemCount(state): number {
      return state.items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find((i) => i.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    },
    incrementQuantity(productId: number) {
      const item = this.items.find((i) => i.product.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(productId: number) {
      const item = this.items.find((i) => i.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        this.removeFromCart(productId);
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  persist: true,
});
