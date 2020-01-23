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
    path: "/create/user",
    name: "create_user",
    component: () =>
      import(
        /* webpackChunkName: "create_user" */ "../components/create/User.vue"
      )
  },
  {
    path: "/create/location",
    name: "create_location",
    component: () =>
      import(
        /* webpackChunkName: "create_location" */ "../components/create/Location.vue"
      )
  },
  {
    path: "/show/user",
    name: "show_user",
    component: () =>
      import(/* webpackChunkName: "show_user" */ "../components/show/User.vue")
  },
  {
    path: "/show/location",
    name: "show_location",
    component: () =>
      import(
        /* webpackChunkName: "show_location" */ "../components/show/Location.vue"
      )
  },
  {
    path: "/show/equipment",
    name: "show_equipment",
    component: () =>
      import(
        /* webpackChunkName: "show_equipment" */ "../components/show/Equipment.vue"
      )
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
