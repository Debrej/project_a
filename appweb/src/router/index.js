import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/show",
    name: "show",
    component: () => import(/* webpackChunkName: "show" */ "../views/Show.vue")
  },
  {
    path: "/affect",
    name: "affect",
    component: () =>
      import(/* webpackChunkName: "affect" */ "../views/Affect.vue")
  },
  {
    path: "/create",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue")
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/PageNotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
