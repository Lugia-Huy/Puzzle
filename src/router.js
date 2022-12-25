import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Ranking from "./components/ranking";

const routes = [
  {
    path: "/",
    alias: "/",
    name: "Home",
    component: () => import("./components/index"),
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
});

export default router;
