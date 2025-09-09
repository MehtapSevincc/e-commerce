import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/product/:id",
    name: "Detail",
    component: () => import("../pages/Detail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
console.log("router loaded");

export default router;
