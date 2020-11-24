import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    alias: "/currency-details",
    name: "currency-details",
    component: () => import("@/views/CurrencyDetailsPage.vue"),
  },
];

const router = new Router({
  mode: "history",
  routes,
});

export default router;
