<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Order } from "@/types";

const router = useRouter();

const email = ref("");
const orders = ref<Order[]>([]);
const loading = ref(false);
const error = ref("");

async function fetchOrders() {
    error.value = "";
    orders.value = [];
    loading.value = true;

    try {
        const res = await fetch(`http://localhost:8000/orders?email=${email.value}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        orders.value = await res.json();
    } catch (err) {
        error.value = "Could not fetch orders. Please try again.";
    } finally {
        loading.value = false;
    }
}

function goDetail(orderId: number) {
    router.push(`/orders/${orderId}`);
}
</script>

<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Find Your Orders</h1>

        <form @submit.prevent="fetchOrders" class="space-y-2 max-w-sm">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="Enter your email" required class="border p-2 w-full" />
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded" :disabled="loading">
                Search Orders
            </button>
        </form>

        <div v-if="loading" class="mt-4">Loading...</div>
        <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>

        <ul v-if="orders.length > 0" class="mt-6 space-y-3">
            <li v-for="o in orders" :key="o.id" class="border p-3 rounded shadow hover:bg-gray-50 cursor-pointer"
                @click="goDetail(o.id)">
                <p><strong>Order #{{ o.id }}</strong></p>
                <p>Total: ${{ (o.total_cents / 100).toFixed(2) }}</p>
                <p>Buyer: {{ o.buyer_name }} ({{ o.buyer_email }})</p>
            </li>
        </ul>
    </div>
</template>
