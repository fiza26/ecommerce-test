import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/products", // 👈 redirect root to products
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../pages/ProductList.vue"),
    },
    {
      path: "/products/:id",
      name: "productDetail",
      component: () => import("../pages/ProductDetail.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../pages/Cart.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../pages/Checkout.vue"),
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("../pages/OrderList.vue"),
    },
    {
      path: "/orders/:id",
      name: "order-detail",
      component: () => import("../pages/OrderDetail.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
