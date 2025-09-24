<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types';

// State for the notification
const showNotification = ref(false);

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();

const id = computed(() => Number(route.params.id));

// Find product in store by id
const product = computed<Product | undefined>(() =>
    productStore.products.find((item) => item.id === id.value)
);

function add() {
    if (product.value) {
        cartStore.addToCart(product.value, 1);
        // Show the notification and hide it after 3 seconds
        showNotification.value = true;
        setTimeout(() => {
            showNotification.value = false;
        }, 3000);
    }
}
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div v-if="product" class="max-w-6xl mx-auto">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div class="w-full lg:w-1/2 flex-shrink-0">
                    <img :src="product.image_url" :alt="product.name"
                        class="w-full h-96 lg:h-auto object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
                        loading="lazy" />
                </div>

                <div class="w-full lg:w-1/2 flex flex-col p-6 md:p-10 space-y-6">
                    <h1
                        class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        {{ product.name }}
                    </h1>

                    <span class="text-3xl font-bold text-gray-900 dark:text-white">
                        ${{ (product.price_cents / 100).toFixed(2) }}
                    </span>

                    <p class="text-lg font-normal text-gray-700 dark:text-gray-400">
                        {{ product.description }}
                    </p>

                    <button @click="add"
                        class="mt-4 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-center text-white bg-green-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors duration-200 ease-in-out cursor-pointer">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="max-w-6xl mx-auto text-center py-10">
            <p class="text-xl font-medium text-gray-700 dark:text-gray-300">
                Loading product...
            </p>
        </div>

        <!-- Notification -->
        <transition enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 translate-x-full" enter-to-class="transform opacity-100 translate-x-0"
            leave-active-class="transition ease-in duration-300" leave-from-class="transform opacity-100 translate-x-0"
            leave-to-class="transform opacity-0 translate-x-full">
            <div v-if="showNotification"
                class="fixed bottom-6 right-6 z-50 p-4 w-full max-w-sm bg-green-600 rounded-lg shadow-xl flex items-center space-x-4">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm font-medium text-white">Item added to cart!</p>
            </div>
        </transition>
    </div>
</template>
