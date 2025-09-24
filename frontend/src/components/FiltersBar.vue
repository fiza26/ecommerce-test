<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from "@/stores/productStore";

const category = ref("");
const sort = ref("asc");
const productStore = useProductStore();

function applyFilters() {
    productStore.fetchProducts(1, 12, { category: category.value, sort: sort.value });
}
</script>

<template>
    <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 mb-8 bg-gray-50 dark:bg-gray-800 shadow-inner">
        <div class="w-full sm:w-auto">
            <label for="category-select" class="sr-only">Filter by Category</label>
            <select id="category-select" v-model="category" @change="applyFilters"
                class="block w-full px-4 py-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200">
                <option value="">All Categories</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
            </select>
        </div>

        <div class="w-full sm:w-auto">
            <label for="sort-select" class="sr-only">Sort by Price</label>
            <select id="sort-select" v-model="sort" @change="applyFilters"
                class="block w-full px-4 py-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200">
                <option value="asc">Price Low → High</option>
                <option value="desc">Price High → Low</option>
            </select>
        </div>
    </div>
</template>