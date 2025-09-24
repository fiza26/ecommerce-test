<script setup lang="ts">
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "../components/ProductCard.vue";
import FiltersBar from "../components/FiltersBar.vue";

const productStore = useProductStore();

onMounted(() => {
    productStore.fetchProducts();
});
</script>

<template>
    <div>
        <FiltersBar />
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto justify-items-center">
                <ProductCard v-if="productStore.products.length" v-for="p in productStore.products" :key="p.id"
                    :product="p" />
                <p v-else class="text-center col-span-full text-lg font-medium text-gray-700 dark:text-gray-300">
                    No products found.
                </p>
            </div>
        </div>
    </div>
</template>
