<template>
  <v-navigation-drawer
    v-model="drawer"
    color="primary"
    app
    fixed
    dark
    @transitionend="changeDrawerStatus"
  >
    <v-list flat nav>
      <v-list-item>
        <v-col class="align-center" absolute>
          <v-img src="@/assets/logo.png" alt="24h logo"></v-img>
        </v-col>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-avatar>
          <v-img
            :src="$host + profilePicBaseURL + user.profile_pic_url"
            lazy-src="@/assets/lazy/loading.gif"
            max-height="350px"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            user.first_name + " " + user.last_name.toUpperCase()
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link :to="dashboard.url">
        <v-list-item-icon>
          <v-icon>{{ dashboard.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t(dashboard.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-expansion-panels accordion v-model="panel">
        <v-expansion-panel v-for="(item, i) in items" :key="i">
          <v-expansion-panel-header
            color="primary"
            :expand-icon="item.icon"
            disable-icon-rotate
          >
            {{ $t(item.title) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-list nav flat>
              <v-list-item
                v-for="(dropdown, i) in item.items"
                :key="i"
                :to="item.url + dropdown.url"
                v-on:click="onPanelClick"
                link
              >
                <v-list-item-title>{{ $t(dropdown.title) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import jwt_decode from "jwt-decode";
import { eventBus } from "../main";
import UserRequest from "../services/http/userService";
const userRequest = new UserRequest();

export default {
  name: "NavigationMenu",
  data: () => ({
    user: {
      last_name: "",
      first_name: "",
      email: "",
      profile_pic_url: ""
    },
    profilePicBaseURL: "files/user/profile_picture/",
    selected: null,
    panel: [],
    drawer: false,
    dashboard: { title: "Dashboard", icon: "mdi-view-dashboard", url: "/" },
    itemsBeforeRoleFiltering: [
      {
        title: "Create",
        icon: "mdi-pencil",
        url: "/create",
        roles: ["user_modifier"],
        items: [
          { title: "Task", url: "/task", roles: ["user_modifier"] },
          { title: "Activity", url: "/activity", roles: ["user_modifier"] },
          { title: "Location", url: "/location", roles: ["user_modifier"] },
          { title: "User", url: "/user", roles: ["user_admin"] },
          { title: "Team", url: "/team", roles: ["user_affect"] }
        ]
      },
      {
        title: "Show",
        icon: "mdi-eye",
        url: "/show",
        roles: ["user"],
        items: [
          { title: "Task", url: "/task", roles: ["user"] },
          { title: "Activity", url: "/activity", roles: ["user"] },
          { title: "Location", url: "/location", roles: ["user"] },
          { title: "User", url: "/user", roles: ["user"] },
          { title: "Equipment", url: "/equipment", roles: ["user"] },
          { title: "Team", url: "/team", roles: ["user_affect"] }
        ]
      },
      {
        title: "Assign",
        icon: "mdi-account-multiple",
        url: "/affect",
        roles: ["user_affect"],
        items: [
          { title: "By user", url: "/user", roles: ["user_affect"] },
          { title: "By task", url: "/task", roles: ["user_affect"] }
        ]
      }
    ],
    roles: [],
    items: []
  }),
  created() {
    this.roles = jwt_decode(localStorage.refreshToken).realm_access.roles;
    this.items = this.itemsBeforeRoleFiltering
      .map(item => {
        let itemTmp = null;
        if (item.roles.some(r => this.roles.indexOf(r) >= 0)) {
          console.log(item);
          item.items = item.items.filter(i =>
            i.roles.some(r => this.roles.indexOf(r) >= 0)
          );
          itemTmp = item;
        }
        return itemTmp;
      })
      .filter(i => i !== null);

    eventBus.$on("drawer-status-change-appbar", drawer => {
      this.drawer = drawer;
    });

    userRequest.fetch({ keycloak_user_id: localStorage.userId }).then(res => {
      this.user = res.data.users[0];
    });
  },
  mounted() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
      case "sm":
      case "md":
        this.drawer = false;
        break;
      case "lg":
      case "xl":
        this.drawer = true;
        break;
    }
  },
  methods: {
    onPanelClick: function() {
      this.panel = [];
    },
    changeDrawerStatus: function() {
      eventBus.$emit("drawer-status-change-drawer", this.drawer);
    }
  }
};
</script>
