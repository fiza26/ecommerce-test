import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "@/types";
import { API_URL } from "@/config";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  async function fetchProducts() {
    loading.value = true;
    try {
      const res = await fetch(`${API_URL}/products`);
      products.value = await res.json();
    } finally {
      loading.value = false;
    }
  }

  return { products, loading, fetchProducts };
});
