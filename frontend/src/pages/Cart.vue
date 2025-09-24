<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

function goCheckout() {
    // Navigate to checkout page
    router.push("/checkout");
}
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10">
            <h1
                class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
                Your Cart
            </h1>

            <div v-if="cart.items.length === 0" class="text-center py-12">
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Your cart is currently empty.
                </p>
                <p class="text-gray-500 mt-2">
                    Add some items from the products page to get started!
                </p>
            </div>

            <div v-else class="flex flex-col space-y-6">
                <div v-for="item in cart.items" :key="item.product.id"
                    class="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 space-y-4 sm:space-y-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
                    <div class="flex-shrink-0 w-20 h-20">
                        <img :src="item.product.image_url" :alt="item.product.name"
                            class="w-full h-full object-cover rounded-md" loading="lazy" />
                    </div>

                    <div class="flex-grow text-center sm:text-left">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                            {{ item.product.name }}
                        </h2>
                        <p class="text-gray-600 dark:text-gray-400">
                            Rp {{ (item.product.price_cents / 100).toFixed(2) }}
                        </p>
                    </div>

                    <div
                        class="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">
                        <div class="flex items-center space-x-2">
                            <button @click="item.quantity > 1 ? cart.decrementQuantity(item.product.id) : null"
                                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                :disabled="item.quantity === 1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <span class="text-lg font-semibold dark:text-white">{{ item.quantity }}</span>
                            <button @click="cart.incrementQuantity(item.product.id)"
                                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <span class="text-lg font-bold text-gray-900 dark:text-white mt-2 sm:mt-0">
                            Rp {{ ((item.product.price_cents / 100) * item.quantity).toFixed(2) }}
                        </span>
                    </div>

                    <button @click="cart.removeFromCart(item.product.id)"
                        class="text-red-500 hover:text-red-700 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div
                    class="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <span class="text-2xl font-bold dark:text-white mb-4 sm:mb-0">Total: Rp {{ (cart.total /
                        100).toFixed(2) }}</span>
                    <button @click="goCheckout"
                        class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-center text-white bg-green-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors duration-200 ease-in-out cursor-pointer">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>