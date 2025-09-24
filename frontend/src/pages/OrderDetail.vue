<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { Order } from "@/types";

const route = useRoute();
const order = ref<Order | null>(null);
const loading = ref(false);
const error = ref("");

async function fetchOrder() {
    error.value = "";
    loading.value = true;

    try {
        const orderId = Number(route.params.id);
        if (isNaN(orderId)) {
            throw new Error("Invalid order ID.");
        }

        const res = await fetch(`http://localhost:8000/orders/${orderId}`);

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to fetch order");
        }

        const fetchedOrder = await res.json();

        fetchedOrder.total_cents = Number(fetchedOrder.total_cents ?? 0);

        fetchedOrder.items.forEach((item: any) => {
            item.price_cents = Number(item.price_cents ?? 0);
            item.quantity = Number(item.quantity ?? 0);
        });

        order.value = fetchedOrder;
    } catch (err: any) {
        console.error(err);
        error.value = `Could not fetch order details: ${err.message}`;
    } finally {
        loading.value = false;
    }
}

onMounted(fetchOrder);
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-8">
        <div class="max-w-4xl mx-auto">
            <h1
                class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
                Order Details
            </h1>

            <div v-if="loading" class="text-center py-12">
                <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Loading order details...
                </p>
            </div>
            <div v-else-if="error"
                class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6 text-center">
                <p>{{ error }}</p>
            </div>

            <div v-if="order"
                class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-6 md:p-10 space-y-8">
                <div class="space-y-2">
                    <h2
                        class="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                        Order Summary
                    </h2>
                    <dl class="text-gray-700 dark:text-gray-300">
                        <div
                            class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                            <dt class="font-medium">Order ID:</dt>
                            <dd class="font-semibold text-gray-900 dark:text-white">{{ order.id }}</dd>
                        </div>
                        <div
                            class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                            <dt class="font-medium">Buyer:</dt>
                            <dd class="font-semibold text-gray-900 dark:text-white">
                                {{ order.customer_name }} ({{ order.customer_email }})
                            </dd>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <dt class="text-xl font-bold">Total:</dt>
                            <dd class="text-xl font-bold text-green-600 dark:text-green-500">
                                Rp {{ (order.total_cents / 100).toFixed(2) }}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div class="space-y-4">
                    <h2
                        class="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                        Items in Your Order
                    </h2>
                    <ul class="space-y-4">
                        <li v-for="i in order.items ?? []" :key="i.product?.id"
                            class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                <img :src="i.product?.image_url || 'https://via.placeholder.com/64'"
                                    :alt="i.product?.name" class="w-full h-full object-cover" />
                            </div>

                            <div class="flex-grow flex flex-col sm:flex-row justify-between w-full sm:items-center">
                                <div class="space-y-1">
                                    <h3 class="font-semibold text-gray-900 dark:text-white">{{ i.product?.name }}</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Qty: {{ i.quantity }}</p>
                                </div>

                                <div class="text-right mt-2 sm:mt-0">
                                    <p class="font-medium text-gray-700 dark:text-gray-300">
                                        <span class="block sm:inline-block">Unit Price:</span> Rp {{ (i.price_cents /
                                            100).toFixed(2) }}
                                    </p>
                                    <p class="font-bold text-gray-900 dark:text-white">
                                        <span class="block sm:inline-block">Subtotal:</span> Rp {{ ((i.price_cents *
                                            i.quantity) / 100).toFixed(2) }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>