// import { createApp } from "vue";
// import { createPinia } from "pinia";
// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// import App from "./App.vue";
// import router from "./router";
// import "./assets/main.css";

// const app = createApp(App);

// app.use(createPinia());
// app.use(router);

// app.mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Apply the persisted state plugin
pinia.use(piniaPluginPersistedstate);

// Use Pinia and router
app.use(pinia);
app.use(router);

app.mount("#app");
