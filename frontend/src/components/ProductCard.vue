<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import { RouterLink } from "vue-router";

const props = defineProps<{ product: Product }>();
const cartStore = useCartStore();

const showNotification = ref(false)

function add() {
    cartStore.addToCart(props.product, 1);
    showNotification.value = true;

    // Hide the notification after 3 seconds
    setTimeout(() => {
        showNotification.value = false;
    }, 3000);
}
</script>

<template>
    <div
        class="max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
        <RouterLink :to="`/products/${product.id}`" class="block">
            <img class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                :src="product.image_url" :alt="product.name" loading="lazy" />
            <div class="p-6 md:p-8 flex flex-col items-start space-y-4">
                <h5 class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                    {{ product.name }}
                </h5>

                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                </div>

                <div class="flex items-center justify-between w-full">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">
                        Rp {{ (product.price_cents / 100).toFixed(2) }}
                    </span>
                </div>
            </div>
        </RouterLink>

        <div class="p-6 pt-0 md:p-8 md:pt-0">
            <button @click="add"
                class="w-full inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors duration-200 ease-in-out cursor-pointer">
                <svg class="w-5 h-5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M5 4a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a3 3 0 0 0-3-3H5Zm0 12a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a3 3 0 0 0-3-3H5Zm2-4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
                        clip-rule="evenodd" />
                </svg>
                Add to cart
            </button>
        </div>
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
</template>