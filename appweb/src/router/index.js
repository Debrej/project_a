import Vue from "vue";
import VueRouter from "vue-router";
import Interface from "../views/Interface.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    component: Interface,
    children: [
      {
        path: "",
        component: Home
      },
      {
        path: "create/user",
        name: "create_user",
        component: () =>
          import(
            /* webpackChunkName: "create_user" */ "../components/create/User.vue"
          )
      },
      {
        path: "create/location",
        name: "create_location",
        component: () =>
          import(
            /* webpackChunkName: "create_location" */ "../components/create/Location.vue"
          )
      },
      {
        path: "create/team",
        name: "create_team",
        component: () =>
          import(
            /* webpackChunkName: "create_team" */ "../components/create/Team.vue"
          )
      },
      {
        path: "show/user",
        name: "show_user",
        component: () =>
          import(
            /* webpackChunkName: "show_user" */ "../components/show/User.vue"
          )
      },
      {
        path: "show/location",
        name: "show_location",
        component: () =>
          import(
            /* webpackChunkName: "show_location" */ "../components/show/Location.vue"
          )
      },
      {
        path: "show/equipment",
        name: "show_equipment",
        component: () =>
          import(
            /* webpackChunkName: "show_equipment" */ "../components/show/Equipment.vue"
          )
      },
      {
        path: "show/team",
        name: "show_team",
        component: () =>
          import(
            /* webpackChunkName: "show_team" */ "../components/show/Team.vue"
          )
      },
      {
        path: "*",
        name: "404",
        component: () =>
          import(/* webpackChunkName: "create" */ "../views/PageNotFound.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
