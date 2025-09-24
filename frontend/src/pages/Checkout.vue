<script setup lang="ts">
import { reactive, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import type { OrderItem, Buyer } from "@/types";

const cart = useCartStore();
const router = useRouter();

const buyer = reactive<Buyer>({
    name: "",
    email: "",
});

const error = ref("");
const successMessage = ref("");

async function submitCheckout() {
    error.value = "";
    successMessage.value = "";

    // Validate cart
    if (cart.items.length === 0) {
        error.value = "Cart is empty.";
        return;
    }

    // Validate buyer info
    if (!buyer.name.trim()) {
        error.value = "Name is required.";
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(buyer.email)) {
        error.value = "Invalid email format.";
        return;
    }

    // Prepare payload for backend
    const payload = {
        customer_name: buyer.name,
        customer_email: buyer.email,
        items: cart.items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
        })),
    };

    try {
        const res = await fetch("http://127.0.0.1:8000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.detail || "Checkout failed");
        }

        const data = await res.json();
        successMessage.value = `Order placed successfully! Order ID: ${data.id}`;
        cart.clearCart();

        router.push(`/orders/${data.id}`);
    } catch (err: any) {
        error.value = `Checkout failed: ${err.message}`;
    }
}
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="max-w-4xl mx-auto">
            <h1
                class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
                Checkout
            </h1>

            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-6 md:p-10">
                <div v-if="successMessage"
                    class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 p-4 rounded-lg mb-6 text-center">
                    <p>{{ successMessage }}</p>
                </div>
                <div v-if="error"
                    class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6 text-center">
                    <p>{{ error }}</p>
                </div>

                <form @submit.prevent="submitCheckout" class="space-y-8">
                    <div class="space-y-4">
                        <h2
                            class="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                            Contact Information
                        </h2>
                        <div>
                            <label for="name"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full
                                Name</label>
                            <input id="name" v-model="buyer.name" type="text" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <label for="email"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email
                                Address</label>
                            <input id="email" v-model="buyer.email" type="email" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" />
                        </div>
                    </div>

                    <div class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
                        <div class="space-y-2">
                            <div v-for="item in cart.items" :key="item.product.id"
                                class="flex justify-between text-gray-700 dark:text-gray-300">
                                <span>{{ item.product.name }} (x{{ item.quantity }})</span>
                                <span>Rp {{ ((item.product.price_cents / 100) * item.quantity).toFixed(2) }}</span>
                            </div>
                        </div>
                        <div
                            class="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-300 dark:border-gray-600">
                            <span>Total:</span>
                            <span>Rp {{ (cart.total / 100).toFixed(2) }}</span>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="submit"
                            class="w-full inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-center text-white bg-green-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors duration-200 ease-in-out cursor-pointer">
                            Confirm Checkout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>